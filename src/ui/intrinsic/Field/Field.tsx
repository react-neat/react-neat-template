import "./Field.scss"

import { omit } from "lodash"
import { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, ReactNode, useId, useRef, useState } from "react"

import { classWithModifiers } from "@/utils/bem"
import PhoneNumber from "@/utils/tools/phonenumber"

import DataList from "../DataList/DataList"
import { DataListValues } from "../DataList/DataList.types"
import { normalizeIconLike } from "../Icon/Icon.helpers"
import { IconLike } from "../Icon/Icon.types"

export interface FieldProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  width?: string
  iconRight?: IconLike
  /**
   * Shows error.
   */
  customValidity?: string | null | false
  /**
   * Custom `datalist`.
   */
  dataListId?: string
  /**
   * Can be used for input suggestions.
   */
  dataListValues?: DataListValues

  /**
   * Sets label for this input.
   */
  children?: ReactNode
}

function Field(props: FieldProps) {
  const id = useId()

  const invalid = !!props.customValidity
  const dataListId = props.dataListId ?? `${id}-datalist`

  const [filled, setFilled] = useState<boolean>(!!props.value || !!props.defaultValue)
  const [focused, setFocused] = useState(false)

  const prevValue = useRef<string>("")

  function sliceMaxLength(value: string) {
    if (props.type === "tel") {
      const phoneNumber = PhoneNumber.parse(value)
      const phoneNumberLength = PhoneNumber.getLength(phoneNumber)

      if (phoneNumberLength > (props.maxLength ?? Infinity)) {
        return prevValue.current
      }

      prevValue.current = value
      return PhoneNumber.format(phoneNumber)
    }

    return value.slice(0, props.maxLength)
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const target = event.currentTarget
    target.value = sliceMaxLength(target.value)

    setFilled(target.value.length > 0)
    props.onChange?.(event)
  }

  return (
    <label className="field" style={{ "--input-width": props.width }}>
      {props.children && (
        <div className="field__label">{props.children}{props.required && "*"}</div>
      )}
      <div className={classWithModifiers("field__appearance", filled && "filled", focused && "focused", invalid && "invalid", props.disabled && "disabled")}>
        <input
          {...omit(props, "iconRight", "customValidity", "children", "dataListId", "dataListValues")}
          className="field__input"
          maxLength={props.type === "tel" ? undefined : props.maxLength}
          placeholder={props.placeholder}

          list={dataListId}

          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}

          onChange={onChange}
        />
        {props.iconRight && (
          <div className="field__icon">{normalizeIconLike(props.iconRight)}</div>
        )}
      </div>
      <span className={classWithModifiers("field__validity", !!props.customValidity && "active")} aria-hidden={!invalid}>
        {props.customValidity}
      </span>
      {props.dataListValues && (
        <DataList id={dataListId} values={props.dataListValues} />
      )}
    </label>
  )
}

export default Field
