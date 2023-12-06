import "./Fields.scss"

import { ReactNode } from "react"

import { classWithModifiers } from "@/utils/bem"

interface FieldsProps {
  width?: "min" | "max" | "fit"

  row?: boolean
  children: ReactNode
}

function Fields(props: FieldsProps) {
  return (
    <div className={classWithModifiers("fields", props.row && "row", props.width)}>{props.children}</div>
  )
}

export default Fields
