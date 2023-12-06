
import { ReactNode } from "react"

import { classMerge, classWithModifiers } from "@/utils/bem"

interface TextBoxProps {
  white?: boolean
  className?: string
  children: ReactNode
}

function TextBox(props: TextBoxProps) {
  return (
    <div className={classMerge(classWithModifiers("text-box", props.white && "white"), props.className)}>
      {props.children}
    </div>
  )
}

export default TextBox
