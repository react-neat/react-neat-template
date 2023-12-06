import { useMemo } from "react"

import FilePreview from "../FilePreview"

function useSource(value: File | URL | string): string {
  return useMemo(() => {
    if (value instanceof File) {
      return FilePreview.getURL(value)
    }

    if (value instanceof URL) {
      return value.toString()
    }

    return value
  }, [value])
}

export default useSource
