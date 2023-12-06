import { Dispatch, useEffect, useState } from "react"

import ObservableLocalStorage from "../tools/observableLocalStorage"

function useObservableLocalStorage<T>(key: string): [T | undefined, Dispatch<T | undefined>, () => void] {
  const [value, setValue] = useState<T>()

  function getItem(): T | undefined {
    const item = ObservableLocalStorage.getItem(key)
    if (item == null || item == "undefined") return undefined

    return item as T
  }

  function refreshItem() {
    const localStorageItem = getItem()

    setValue(localStorageItem ?? undefined)
  }

  function updateValue(value: T | undefined) {
    const serializedValue = JSON.stringify(value ?? null)

    ObservableLocalStorage.setItem(key, serializedValue)
    setValue(value)
  }

  function removeItem() {
    ObservableLocalStorage.removeItem(key)
  }

  useEffect(() => {
    // Get value on mount
    refreshItem()
    // Observe
    return ObservableLocalStorage.observe(refreshItem)
  }, [key])

  return [value ?? getItem(), updateValue, removeItem]
}

export default useObservableLocalStorage
