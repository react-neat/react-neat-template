import "./Form.scss"

import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react"

import { classMerge } from "@/utils/bem"

interface FormProps extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  children: ReactNode
}

function Form(props: FormProps) {
  return (
    <form {...props} className={classMerge("form", props.className)}>{props.children}</form>
  )
}

export default Form
