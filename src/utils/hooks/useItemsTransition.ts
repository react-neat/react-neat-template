import { useEffect, useState } from "react"
import { useInterval } from "react-use"


interface UseItemsTransitionOptions {
  /**
   * Milliseconds.
   */
  interval?: number
}

const DEFAULT_OPTIONS: UseItemsTransitionOptions = {
  interval: 1000
}

/**
 * Gradually goes through every given item using `interval`.
 */
function useItemsTransition<Item>(items: Item[], options?: UseItemsTransitionOptions): Item | undefined {
  const [itemIndex, setItemIndex] = useState(0)

  function transit() {
    if (items.length <= 1) return

    if (itemIndex >= (items.length - 1)) {
      setItemIndex(0)
      return
    }

    setItemIndex(itemIndex + 1)
  }
  useInterval(transit, options?.interval ?? DEFAULT_OPTIONS.interval)

  useEffect(() => setItemIndex(0), [items])

  return items.at(itemIndex)
}

export default useItemsTransition
