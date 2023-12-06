import Observer from "./observer"

class ObservableLocalStorage {
  private static observer = new Observer()

  static clear(): void {
    return localStorage.clear()
  }
  static key(index: number): string | null {
    return localStorage.key(index)
  }

  static getItem(key: string): string | null {
    const value = localStorage.getItem(key)
    if (value == null) return null

    try {
      return JSON.parse(value)
    } catch (error) {
      console.error(error)
      return null
    }
  }
  static removeItem(key: string): void {
    localStorage.removeItem(key)
    this.observer.emit()
  }
  static setItem(key: string, value: string): void {
    localStorage.setItem(key, value)
    this.observer.emit()
  }

  /**
   * @returns unsubscribe method.
   */
  static observe(listener: () => void): () => void {
    return this.observer.observe(listener)
  }
}

export default ObservableLocalStorage
