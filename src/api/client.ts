import { QueryClient } from "@tanstack/react-query"
import { ZodError } from "zod"

import QueryError from "./QueryError"

const staleTime = import.meta.env.MODE === "development" ? 0 : Number(import.meta.env.VITE_API_CACHE_TIME)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime,

      refetchOnWindowFocus: () => false,
      retry(_failureCount, error) {
        if (error instanceof QueryError) {
          return false
        }

        if (error instanceof ZodError) {
          return false
        }

        return true
      },
      /**
       * Try every 10, 20, 30, ... "seconds", depending on `failureCount`.
       *
       * if `failureCount` more than 50, retry delay clumps to 5 "minutes".
       */
      retryDelay(failureCount) {
        if (failureCount > 50) {
          return 10 * 1000 * 60 // 5 minutes
        }

        return failureCount * 5 * 1000
      }
    }
  }
})
export default queryClient
