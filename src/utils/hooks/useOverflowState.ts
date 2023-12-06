import { RefObject, useLayoutEffect, useRef, useState } from "react"

import useResizeObserver from "./useResizeObserver"

import Percentage from "../tools/percentage"


/**
 * !!! **CURRENTLY WORKS PROPERLY WITH HEIGHTS ONLY** !!!
 *
 * Indicates if the element is overflowing.
 *
 * Note that you may have to use `overflow: [auto|hidden]` on the element too.
 *
 * @param minChangeThreshold stands for minimum size change percentage to define that element is not overflowing.
 */
function useOverflowState(elementRef: RefObject<HTMLElement>, minChangeThreshold: number): boolean {
  const [overflowing, setOverflowing] = useState(false)
  const lastHeight = useRef<number>(0)

  function onResize() {
    if (elementRef.current == null) return
    if (overflowing && isMinThresholdReached(elementRef.current)) return

    setOverflowing(isOverflowing(elementRef.current))
  }

  function isOverflowing(element: HTMLElement): boolean {
    if (element.offsetWidth < element.scrollWidth) {
      return true
    }

    if (element.offsetHeight < element.scrollHeight) {
      return true
    }

    return false
  }

  function isMinThresholdReached(element: HTMLElement): boolean {
    const heightChange = Percentage.difference(lastHeight.current, element.scrollHeight)
    return heightChange < minChangeThreshold
  }

  useResizeObserver(elementRef, onResize)

  useLayoutEffect(onResize, [])
  useLayoutEffect(() => {
    if (elementRef.current == null) return

    lastHeight.current = elementRef.current.scrollHeight
  }, [overflowing])

  return overflowing
}

export default useOverflowState
