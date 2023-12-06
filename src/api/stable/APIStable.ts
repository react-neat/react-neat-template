import { capitalize } from "lodash"
import toast from "react-hot-toast"

import ObservableLocalStorage from "@/utils/tools/observableLocalStorage"

import pathTitles from "./actions/titles"
import APIDocs from "./data/docs.json"
import mappings from "./mappings"

import API from "../API"
import { getMethodForm } from "../helpers"
import QuerySwagger from "../QuerySwagger"
import { HTTPStatus } from "../types"

export const APIDocsSwagger = new QuerySwagger(APIDocs)

export const APIStable = new API({
  baseURL: import.meta.env.VITE_API_HOST,

  swagger: APIDocsSwagger,
  schemaMappings: mappings,

  options: {
    endpoint: {
      includeVersion: true,
      includeTrailingSlash: true
    },
    request: {
      security: {
        tokens: [{
          type: "JWT",
          header: "Authorization",
          read: () => ObservableLocalStorage.getItem("user-token")
        }]
      }
    },
    response: {
      statusCodeFromPayload(payload) {
        if ("error" in payload) {
          return HTTPStatus.BadRequest
        }

        return HTTPStatus.OK
      }
    },
    debug: {
      enabled: import.meta.env.MODE === "development",
      mock: "auto"
    }
  },

  default: {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  }
})

APIStable.on("pending", (action, request) => {
  if (action.method === "GET") return

  const id = request.url
  const title = pathTitles[action.endpoint.path] ?? ""

  const loadingMessage = `${capitalize(title)} ${getMethodForm(action.method, "active")}`
  toast.loading(loadingMessage, { id, duration: Infinity })
})

APIStable.on("success", (action, request) => {
  if (action.method === "GET") return

  const id = request.url
  const title = pathTitles[action.endpoint.path] ?? ""

  const successMessage = `${capitalize(title)} successfully ${getMethodForm(action.method, "completed")}`
  toast.success(successMessage, { id, duration: 5 * 1000 })
})

APIStable.on("error", (action, request, error) => {
  if (action.method === "GET") return

  const id = request.url
  const title = pathTitles[action.endpoint.path] ?? ""

  const errorMessage = `Error while ${getMethodForm(action.method, "active")} ${title}`
  toast.error(errorMessage, { id, duration: 5 * 1000 })
  // Extra message error.
  toast.error(error.message, { id, duration: 5 * 1000 })
})
