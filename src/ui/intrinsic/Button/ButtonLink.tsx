import { MouseEventHandler } from "react"

import { Link } from "@/app/AppRouter"
import { classMerge, classWithModifiers } from "@/utils/bem"

import { ButtonIconize } from "./Button.helpers"
import { ButtonBaseProps } from "./Button.types"

interface ButtonLinkProps extends ButtonBaseProps {
  to: string
  nav?: boolean
  end?: boolean
  disabled?: boolean
  replace?: boolean
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

function ButtonLink(props: ButtonLinkProps) {
  const modifiers: string[] = []
  if (props.color) modifiers.push(props.color)
  if (props.size) modifiers.push(props.size)

  if (props.outline) modifiers.push("outline")
  if (props.squared) modifiers.push("squared")

  if (props.disabled) modifiers.push("disabled")
  return (
    <Link
      className={classMerge(classWithModifiers("button", ...modifiers), props.className)}
      replace={props.replace}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      to={(props.disabled ? "." : props.to) as any}
      onClick={props.onClick}
    >
      <ButtonIconize icon={props.iconLeft} />
      <div className="button__text">{props.children}</div>
      <ButtonIconize icon={props.iconRight ?? "arrow-right"} />
    </Link>
  )
}

export default ButtonLink
