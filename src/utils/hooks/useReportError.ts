import { toast } from "react-hot-toast"

type ReportError = (error: Error | string) => void

function useReportError(): ReportError {
  function reportError(error: Error | string) {
    if (error instanceof Error) {
      toast.error(error.message)
      // SentryError
    }

  }

  return reportError
}

export default useReportError
