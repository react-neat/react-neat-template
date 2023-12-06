import { ErrorInfo } from "react"

import { ErrorBoundaryError, ErrorBoundaryReset } from "@/app/boundaries/ErrorBoundary/ErrorBoundary.types"

import FatalError from "./FatalError"

function FatalErrorFallback(reset: ErrorBoundaryReset, error?: ErrorBoundaryError, errorInfo?: ErrorInfo) {
  return (
    <FatalError reset={reset} error={error} errorInfo={errorInfo} />
  )
}

export default FatalErrorFallback
