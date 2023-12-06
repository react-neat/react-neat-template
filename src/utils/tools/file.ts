import { Buffer } from "buffer"
import { uniqBy } from "lodash"

import { URLDataBase64 } from "../types"

class FileUtils {
  static toURLData(file: File): Promise<URLDataBase64> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.readAsDataURL(file)
      reader.onload = () => {
        if (reader.result === null) {
          throw new Error("File reading resulted in null.")
        }

        if (reader.result instanceof ArrayBuffer) {
          throw new Error("ArrayBuffer suddenly appeared as a result of file reading.")
        }

        resolve(reader.result as URLDataBase64)
      }
      reader.onerror = reject
    })
  }

  static toFormData(file: File, fieldName?: string): FormData {
    const formData = new FormData
    formData.append(fieldName ?? file.name, file)

    return formData
  }

  /**
   * https://stackoverflow.com/a/61321728/12468111
   */
  static parseDataURI(dataURI: string): File {
    const splitDataURI = dataURI.split(",")

    const mimeString = splitDataURI[0].split(":")[1].split(";")[0]

    const buffer = Buffer.from(splitDataURI[1], "base64")

    return new File([buffer], "file." + mimeString.split("/")[1], { type: mimeString })
  }


  public static async fromExternalURL(url: URL | string): Promise<File> {
    function getFileNameFromHeaders(headers: Headers): string | null {
      const header = headers.get("Content-Disposition")
      if (header == null) return null

      const matchArray = header.match(/filename="(.*?)"/)
      if (matchArray == null) return null

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_match, group1] = matchArray
      return group1
    }

    const fileResponse = await fetch(url)
    const fileBlob = await fileResponse.blob()

    const fileName = getFileNameFromHeaders(fileResponse.headers) ?? "unknown"
    const fileOptions: FilePropertyBag = {
      type: fileResponse.headers.get("Content-Type") ?? ""
    }

    const file = new File([fileBlob], fileName, fileOptions)
    return file
  }

  static toFileList(files: File[]): FileList {
    const dataTransfer = new DataTransfer()

    files.forEach(file => dataTransfer.items.add(file))

    return dataTransfer.files
  }

  static getId(file: File): string {
    return `${file.lastModified}-${file.size}-${file.name}`
  }

  static removeDuplicates(files: File[]): File[] {
    return uniqBy(files, FileUtils.getId)
  }
}

export default FileUtils
