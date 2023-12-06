import { ReactNode, RefObject, useEffect, useMemo, useState } from "react"


const DEFAULT_THRESHOLD = 0.8

interface InfiniteScrollProps {
  /**
   * @default 1
   */
  defaultPage?: number
  pageSize: number

  /**
   * @default 0.8
   */
  threshold?: number
  /**
   * @default Window
   */
  elementRef?: RefObject<HTMLElement>

  children: ReactNode[]
}

function InfiniteScroll(props: InfiniteScrollProps) {
  const [page, setPage] = useState<number>(props.defaultPage ?? 1)

  function onScroll() {
    if (props.elementRef?.current == null) return
    const element = props.elementRef.current

    if ((page * props.pageSize) >= props.children.flat(2).length) {
      element.removeEventListener("scroll", onScroll)
      return
    }

    const scrollTopDifference = element.scrollTop / (element.scrollHeight - element.clientHeight)
    if (scrollTopDifference < (props.threshold ?? DEFAULT_THRESHOLD)) return

    setPage(page => page + 1)
  }

  useEffect(() => {
    props.elementRef?.current?.addEventListener("scroll", onScroll)
    return () => {
      props.elementRef?.current?.removeEventListener("scroll", onScroll)
    }
  }, [props.elementRef])

  return useMemo(() => {
    return <>{props.children.flat(2).slice(0, page * props.pageSize)}</>
  }, [props.children, page, props.pageSize])
}

export default InfiniteScroll
