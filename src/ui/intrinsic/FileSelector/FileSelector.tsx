import "./FileSelector.scss"

import { ChangeEvent, useState } from "react"

import { classWithModifiers } from "@/utils/bem"

import { FileSelectorBaseProps } from "./types"

import Icon from "../Icon/Icon"

interface FileSelectorProps extends FileSelectorBaseProps {
  defaultValue?: File
  onChange?(value: File | undefined): void
}

function FileSelector(props: FileSelectorProps) {
  const [file, setFile] = useState<File | undefined>(props.defaultValue)

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const target = event.currentTarget

    const file = target.files?.[0]
    if (file == null) return

    setFile(file)
    props.onChange?.(file)
  }

  function onRemove() {
    setFile(undefined)
    props.onChange?.(undefined)
  }

  return (
    <div className="file-selector">
      {props.label && (
        <div className="file-selector__label">{props.label}</div>
      )}
      <label className="file-selector__container">
        <div className={classWithModifiers("file-selector__appearance", !!file && "filled")}>{file?.name ?? props.placeholder ?? "Choose file"}</div>
        <input className="file-selector__input" type="file" accept={props.accept} onChange={onChange} />
        {props.clearable && (
          <button className="file-selector-empty" type="button" onClick={onRemove}>
            <Icon className="file-selector-empty__icon" name="trash-bin" />
          </button>
        )}
      </label>
    </div>
  )
}

export default FileSelector
