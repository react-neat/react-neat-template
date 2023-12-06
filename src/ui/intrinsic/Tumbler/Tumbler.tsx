import "./Tumbler.scss"

import { useState } from "react"

import { classWithModifiers } from "@/utils/bem"

interface TumblerProps {
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
}

function Tumbler(props: TumblerProps) {
  const [checked, setChecked] = useState(props.checked ?? props.defaultChecked ?? false)
  function toggle() {
    const newChecked = !checked

    setChecked(newChecked)
    props.onChange?.(newChecked)
  }
  return (
    <button className={classWithModifiers("tumbler", checked && "checked")} type="button" onClick={toggle}>
      <span className="tumbler__text">
        {checked ? "ON" : "OFF"}
      </span>
    </button>
  )
}

export default Tumbler
