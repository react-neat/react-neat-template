import { useMemo } from "react"

import FilePreview from "../FilePreview"

/**
 * Makes sure new `FilePreview` is created only on `file` update.
 */
function useFilePreview<T extends File | null | undefined, R extends (string | Exclude<T, File>)>(file: T): R {
  const filePreview: string | undefined = useMemo(() => {
    if (file == null) return

    return FilePreview.getURL(file)
  }, [file])

  return filePreview as R
}

export default useFilePreview
