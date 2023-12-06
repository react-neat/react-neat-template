import { ErrorInfo } from "react"

import { ErrorBoundaryError, ErrorBoundaryReset } from "@/app/boundaries/ErrorBoundary/ErrorBoundary.types"
import Details from "@/ui/utils/Details/Details"

import ClientError from "./ClientError"


function ClientErrorFallback(reset: ErrorBoundaryReset, error?: ErrorBoundaryError, errorInfo?: ErrorInfo) {
  return (
    <ClientError title={error?.name} onReset={reset}>
      <p>{error?.message}</p>
      <Details summary="Component Stack">
        {errorInfo?.componentStack}
      </Details>
    </ClientError>
  )
}

export default ClientErrorFallback
