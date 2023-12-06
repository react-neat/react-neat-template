import "./Button.scss"

import { MouseEvent, MouseEventHandler, useState } from "react"

import Loader from "@/ui/utils/Loader/Loader"
import { classMerge, classWithModifiers } from "@/utils/bem"

import { ButtonIconize } from "./Button.helpers"
import { ButtonBaseProps } from "./Button.types"

interface ButtonProps extends ButtonBaseProps {
  type?: "reset" | "submit"
  disabled?: boolean
  /**
   * If `onClick` returns promise, the button will be blocked until resolved.
   */
  await?: boolean
  pending?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
}

function Button(props: ButtonProps) {
  const [pending, setPending] = useState(false)
  async function onClick(event: MouseEvent<HTMLButtonElement>) {
    if (props.await) {
      await onClickPromise(event)
      return
    }

    props.onClick?.(event)
  }
  async function onClickPromise(event: MouseEvent<HTMLButtonElement>) {
    setPending(true)
    try {
      await props.onClick?.(event)
    } finally {
      setPending(false)
    }
  }

  const modifiers: string[] = []
  if (props.color) modifiers.push(props.color)
  if (props.size) modifiers.push(props.size)

  if (props.outline) modifiers.push("outline")
  if (props.squared) modifiers.push("squared")

  if (pending || props.pending) modifiers.push("pending")

  return (
    <button className={classMerge(classWithModifiers("button", ...modifiers), props.className)} type={props.type || "button"} disabled={props.disabled || pending} onClick={onClick}>
      <ButtonIconize icon={props.iconLeft} />
      <div className="button__text">{props.children}</div>
      <ButtonIconize icon={props.iconRight} />
      <div className="button__loader">
        <Loader />
      </div>
    </button>
  )
}

export default Button
