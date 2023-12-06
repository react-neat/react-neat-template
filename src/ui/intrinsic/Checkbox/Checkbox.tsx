import "./Checkbox.scss"

import { omit } from "lodash"
import { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from "react"

import { classMerge } from "@/utils/bem"

import Icon from "../Icon/Icon"

export interface CheckboxProps extends Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "onChange"> {
  onChange?(checked: boolean): void
}

function Checkbox(props: CheckboxProps) {
  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const target = event.currentTarget

    props.onChange?.(target.checked)
  }

  return (
    <label className={classMerge("checkbox", props.className)} style={props.style}>
      {props.children && (
        <div className="checkbox__label">{props.children}</div>
      )}
      <input {...omit(props, "children", "style")} type="checkbox" className="checkbox__input" onChange={onChange} />
      <div className="checkbox__appearance">
        <Icon name="check" className="checkbox__icon" />
      </div>
    </label>
  )
}

export default Checkbox
