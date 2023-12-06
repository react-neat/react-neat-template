import { RefObject, useLayoutEffect } from "react"

function useResizeObserver(elementRef: RefObject<HTMLElement>, onChange: ResizeObserverCallback): void {
  useLayoutEffect(() => {
    if (elementRef.current == null) return

    const resizeObserver = new ResizeObserver(onChange)
    resizeObserver.observe(elementRef.current)

    return () => resizeObserver.disconnect()
  }, [elementRef, onChange])
}

export default useResizeObserver
