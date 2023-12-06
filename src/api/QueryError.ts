import { startCase } from "lodash"

import { HTTPStatus } from "./types"

class QueryError extends Error {
  constructor(error: Error) {
    super(error.message)

    this.name = QueryError.name
  }

  /**
   * Returns errors according to the `status`.
   */
  static fromStatus(status: HTTPStatus & number): QueryServerError | QueryClientError | QueryError {
    const message = startCase(HTTPStatus[status])

    if (status >= 500) {
      return new QueryServerError(message)
    }

    if (status >= 400) {
      return new QueryClientError(message)
    }

    return new QueryError(new Error(message))
  }
}

export class QueryFetchError extends QueryError { }
export class QueryServerError extends Error {
  constructor(message: string) {
    super(message)

    this.name = QueryServerError.name
  }
}
export class QueryClientError extends Error {
  constructor(message: string) {
    super(message)

    this.name = QueryClientError.name
  }
}

export default QueryError
