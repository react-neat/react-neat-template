import "./Details.scss"

import { ReactNode, useEffect, useRef, useState } from "react"

import { classWithModifiers } from "@/utils/bem"
import { toggleState } from "@/utils/react"

import Icon from "../../intrinsic/Icon/Icon"

interface DetailsProps {
  defaultExpanded?: boolean

  summary: ReactNode
  children: ReactNode
}

function Details(props: DetailsProps) {
  const innerRef = useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useState<boolean>(props.defaultExpanded ?? false)
  const [height, setHeight] = useState<number>()
  useEffect(() => {
    if (!innerRef.current) return
    setHeight(innerRef.current.scrollHeight)
  }, [expanded])
  return (
    <div className="details" aria-expanded={expanded}>
      <div className="details__summary" onClick={toggleState(setExpanded)}>
        <div className="details__text">{props.summary}</div>
        <div className={classWithModifiers("details__icon", expanded && "expanded")}>
          <Icon name="chevron-down" />
        </div>
      </div>
      <div className={classWithModifiers("details__body", expanded && "expanded")} style={{ "--details-height": height }} aria-hidden={!expanded}>
        <div className="details__inner" ref={innerRef}>{props.children}</div>
      </div>
    </div>
  )
}

export default Details
