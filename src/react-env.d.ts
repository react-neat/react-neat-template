import "react"

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /** Inferred from `package.json`. */
      readonly VITE_NAME: string
      /** Inferred from `package.json`. */
      readonly VITE_VERSION: string

      readonly VITE_API_HOST: string
      readonly VITE_API_CACHE_TIME: string

      readonly VITE_SENTRY: string
      readonly VITE_SENTRY_DSN: string
    }
  }
}
