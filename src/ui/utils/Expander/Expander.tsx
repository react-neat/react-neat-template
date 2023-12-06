import "./Expander.scss"

import { ReactNode, useEffect, useRef, useState } from "react"

import { classMerge, classWithModifiers } from "@/utils/bem"

interface ExpanderProps {
  className?: string
  noTransition?: boolean

  expanded: boolean
  children: ReactNode
}

function Expander(props: ExpanderProps) {
  const containerElementRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number | undefined>()

  useEffect(() => {
    if (containerElementRef.current == null) return

    const minimalHeight = Math.min(containerElementRef.current.scrollHeight, containerElementRef.current.clientHeight, containerElementRef.current.offsetHeight)
    setHeight(minimalHeight)
  }, [props.expanded, props.children])

  return (
    <div className={classWithModifiers("expander", props.expanded && "expanded", props.noTransition && "no-transition")} aria-hidden={!props.expanded} style={{ "--height": height }}>
      <div className={classMerge("expander__inner", props.className)}>
        <div className="expander__container">
          <div ref={containerElementRef}>{props.children}</div>
        </div>
      </div>
    </div>
  )
}

export default Expander
