import { useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query"
import EventEmitter from "eventemitter3"
import { SwaggerDocs } from "openapi-schema-tools"
import { useCallback, useMemo } from "react"
import { ZodError } from "zod"

import JWT from "@/utils/tools/jwt"

import Endpoint from "./Endpoint"
import QueryAction, { QueryActionAny } from "./QueryAction"
import QueryError from "./QueryError"
import QueryShape from "./QueryShape"
import QuerySwagger from "./QuerySwagger"
import { HeaderName, HTTPStatus, RequestMethod } from "./types"

interface BiMapInverse {
  inverse<A1, A2>(value: A1): A2
}

interface APIConfig<Docs extends SwaggerDocs> {
  baseURL: string

  swagger: QuerySwagger<Docs>
  schemaMappings?: {
    [K in keyof this["swagger"]["schemas"]]?:
    | ((plain: this["swagger"]["schemas"][K]["_plain"], schema: this["swagger"]["schemas"][K]["schema"]) => unknown)
    | BiMapInverse
  }

  options?: IAPIOptions
  default?: {
    headers?: Partial<Record<HeaderName, string>>
  }
}

interface IAPIOptions {
  endpoint?: IAPIOptionsEndpoint
  response?: IAPIOptionsResponse
  request?: IAPIOptionsRequest
  debug?: {
    /**
     * Whether to enable debug mode.
     *
     * @default
     * import.meta.env.MODE === "development"
     */
    enabled?: boolean

    /**
     * Whether to replace unsatisfied body with a mock.
     *
     * ### Description
     *
     * - `auto` - body will be mocked if body is capable to be mocked and there is a need.
     * - `always` - body always will be mocked if body is capable to be mocked even if there is no need.
     * - `never` - body never will be mocked.
     *
     * @default
     * "auto"
     */
    mock?: "auto" | "always" | "never"
  }
}

interface IAPIOptionsEndpoint {
  /**
   * Whether to add version to request url.
   *
   * @example
   * "https://example.com/my-endpoint" if false
   * "https://example.com/v1.0.0/my-endpoint" if true
   */
  includeVersion?: boolean
  /**
   * Whether to add slash on the end of an endpoint.
   *
   * @example
   * "/my-endpoint" if false
   * "/my-endpoint/" if true
   *
   * @example
   * "/my-endpoint?foo=bar" if false
   * "/my-endpoint/?foo=bar" if true
   */
  includeTrailingSlash?: boolean
}

interface IAPIOptionsResponse {
  statusCodeFromPayload?(payload: never): HTTPStatus
}

interface IAPIOptionsRequest {
  security?: {
    /**
     * Whether to add token to request headers.
     */
    tokens?: {
      type?: "JWT"
      header: HeaderName
      read(): string | null | undefined
    }[]
  }
}

interface APIEvents {
  pending(action: QueryAction, request: Request): void
  success(action: QueryAction, request: Request): void
  error(action: QueryAction, request: Request, error: Error): void
  mocked(): void
}

class API<Docs extends SwaggerDocs> {
  private events: EventEmitter<APIEvents> = new EventEmitter

  swagger: this["config"]["swagger"]
  schemaMappings: this["config"]["schemaMappings"]

  constructor(readonly config: APIConfig<Docs>) {
    this.swagger = config.swagger
    this.schemaMappings = config.schemaMappings
  }

  async query<Action extends QueryActionAny>(action: Action, requestInfo?: Action["_request"]): Promise<Action["_response"]> {
    const request = await action.toRequest(this.config.baseURL, requestInfo)
    try {
      this.resolveAuthorization(request.headers)
      this.events.emit("pending", action, request)
      const response = await fetch(request)
      if (response.status >= 400) {
        throw QueryError.fromStatus(response.status)
      }

      const queryResponse = await this.createResponse(response, action)
      this.events.emit("success", action, request)
      return queryResponse
    } catch (error) {
      if (error instanceof Error) {
        this.events.emit("error", action, request, error)
      }
      throw error
    }
  }

  async querySafe<Action extends QueryActionAny>(action: Action, requestInfo?: Action["_request"]): Promise<Action["_responseSafe"]> {
    try {
      const response = await this.query(action, requestInfo)
      return {
        ...response,
        error: null,
      }
    } catch (error) {
      if (error instanceof Error) {

        return {
          error,
          payload: null
        }
      }

      throw error
    }
  }

  private async createResponse<Action extends QueryAction>(response: Response, action: QueryAction): Promise<Action["_response"]> {
    try {
      const payload = await action.resolveResponsePayload(response)
      const payloadShaped = await this.shape(action.requestBodyShape, payload)

      return {
        payload: payloadShaped,
        status: response.status,
        headers: response.headers,

        nativeResponse: response
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new QueryError(error)
      }

      throw error
    }
  }

  private async shape<Shape extends QueryShape>(shape: Shape, value: Shape["schema"]["_partial"]): Promise<Shape["_shaped"]> {
    if (this.config.options?.debug?.mock === "never") return shape.form(value, "required")
    if (this.config.options?.debug?.mock === "always") return shape.schema.mock()

    try {
      // Default: "Auto"
      return shape.form(value, "mocked")
    } catch (error) {
      // "ZodError" means that error highly likely caused by `value` and `schema` mismatch.
      if (error instanceof ZodError) {
        this.events.emit("mocked")
        return shape.schema.mock()
      }

      throw error
    }
  }

  private resolveAuthorization(headers: Headers): void {
    const securityTokens = this.config.options?.request?.security?.tokens
    if (securityTokens == null) return

    const token = securityTokens[0].read()
    if (token == null) return

    const jwt = new JWT(token)
    headers.set("Authorization", jwt.authorization)
  }


  on<Name extends keyof APIEvents>(
    name: Name,
    listener: EventEmitter.EventListener<APIEvents, Name>
  ) {
    this.events.on(name, listener)
    return () => {
      this.events.off(name, listener)
    }
  }





  createRetrieveHook() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return <Path extends keyof this["swagger"]["actions"]["GET"], Action extends this["swagger"]["actions"]["GET"][Path]>(path: Path, requestInfo?: Action["_request"], options?: Omit<UseQueryOptions<any, any, any, any>, "queryKey" | "queryFn" | "initialData">) => {
      const action = useMemo(() => this.swagger.actions.GET[path], [path])
      const endpoint = Endpoint.resolveVariables(action.endpoint.path, (requestInfo?.pathParams ?? {}))

      const queryKey = useMemo(() => Endpoint.split(endpoint), [endpoint])
      const queryFn = useCallback(() => this.query(action, requestInfo), [action, requestInfo])

      const queryResult = useQuery<Action["_response"]>({
        ...options,
        queryFn,
        queryKey
      })
      return queryResult.data
    }
  }

  createMutationHook() {
    return <Method extends RequestMethod, Path extends keyof this["swagger"]["actions"][Method]>(method: Method, path: Path) => {
      const client = useQueryClient()
      const action = this.swagger.actions[method][path]

      const mutation = async (requestInfo?: typeof action["_request"]) => {
        const endpoint = Endpoint.resolveVariables(action.endpoint.path, (requestInfo?.pathParams ?? {}))

        const queryKey = Endpoint.split(endpoint)
        const queryFn = () => this.querySafe(action, requestInfo)

        return await client.fetchQuery({
          queryFn,
          queryKey,

          staleTime: 0,
        })
      }

      return mutation
    }
  }
}

export default API
