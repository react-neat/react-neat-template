class FilePreview {
  private static cache: WeakMap<File, string> = new WeakMap
  private static cleanup = new FinalizationRegistry(URL.revokeObjectURL)

  private static getObjectURL(file: File): string {
    const cachedUrl = FilePreview.cache.get(file)
    if (cachedUrl) return cachedUrl

    return URL.createObjectURL(file)
  }

  /**
   * Creates consistent preview url for given `file`, revokes it when `file` has no pointers.
   *
   * @throws `TypeError` if `file` is non-media.
   */
  public static getURL(file: File): string {
    if (file.type.search(/image|video/) === -1) {
      throw new TypeError("Non-media file can't have a preview.")
    }

    const url = FilePreview.getObjectURL(file)

    FilePreview.cache.set(file, url)
    FilePreview.cleanup.register(file, url)

    return url
  }
}

export default FilePreview
