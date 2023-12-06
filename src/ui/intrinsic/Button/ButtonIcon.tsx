import "./Button.scss"

import { MouseEvent, MouseEventHandler, useState } from "react"

import Loader from "@/ui/utils/Loader/Loader"
import { classMerge, classWithModifiers } from "@/utils/bem"

import { ButtonBaseProps } from "./Button.types"

import Icon, { IconName } from "../Icon/Icon"

interface ButtonIconProps extends Omit<ButtonBaseProps, "iconLeft" | "iconRight" | "children"> {
  type?: "reset" | "submit"
  eventLabel?: string
  name: IconName
  disabled?: boolean
  await?: boolean
  pending?: boolean
  /**
   * As such buttons have no text, you should always define a label.
   *
   * This is to enforce you do this ^-^
   */
  ariaLabel: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}

function ButtonIcon(props: ButtonIconProps) {
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
  // Defines that this is icon-only button (button with only icon as `children`)
  modifiers.push("icon-only")
  if (props.color) modifiers.push(props.color)
  if (props.size) modifiers.push(props.size)

  if (props.outline) modifiers.push("outline")
  if (props.squared) modifiers.push("squared")

  if (pending || props.pending) modifiers.push("pending")

  return (
    <button className={classMerge(classWithModifiers("button", ...modifiers), props.className)} type={props.type || "button"} disabled={props.disabled || pending} onClick={onClick} aria-label={props.ariaLabel}>
      {/* Pass size to `button__icon` so now it controls the padding by itself */}
      <div className={classMerge(classWithModifiers("button__icon", props.size), props.className)}>
        <Icon name={props.name} />
      </div>
      <div className="button__loader">
        <Loader />
      </div>
    </button>
  )
}

export default ButtonIcon
