import "./FileSelector.scss"

import { castArray } from "lodash"
import { ChangeEvent, useState } from "react"

import Expander from "@/ui/utils/Expander/Expander"
import { classWithModifiers } from "@/utils/bem"
import useFilePreview from "@/utils/hooks/useFilePreview"
import { toggleState } from "@/utils/react"
import FileUtils from "@/utils/tools/file"

import { FileSelectorBaseProps } from "./types"

import Icon from "../Icon/Icon"

interface FileSelectorMultipleProps extends FileSelectorBaseProps {
  defaultValue?: File[]
  onChange?(value: File[]): void
}

function FileSelectorMultiple(props: FileSelectorMultipleProps) {
  const [files, setFiles] = useState<File[]>(castArray(props.defaultValue ?? []))
  const [expanded, setExpanded] = useState<boolean>(!props.defaultValue)

  function addFiles(files: File[]) {
    setFiles(oldFiles => {
      const newFiles = FileUtils.removeDuplicates([...oldFiles, ...files])
      props.onChange?.(newFiles)
      return newFiles
    })
  }
  function removeFile(file: File) {
    setFiles(oldFiles => {
      const newFiles = oldFiles.filter(oldFile => oldFile !== file)
      props.onChange?.(newFiles)
      return newFiles
    })
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const target = event.currentTarget
    addFiles([...target.files ?? []])
  }

  function onClear() {
    setFiles([])
    props.onChange?.([])
  }

  if (files.length <= 1) {
    return <FileSelectorMultipleSingle {...props} file={files[0]} onChange={onChange} onClear={onClear} />
  }

  return (
    <div className="file-selector-multiple">
      <div className="file-selector-multiple__header">
        {props.label && (
          <button className="file-selector-multiple__label" type="button" onClick={toggleState(setExpanded)}>{props.label}</button>
        )}
        <label className={classWithModifiers("file-selector-multiple__add", expanded && "expanded")}>
          <Icon name="square-plus" />
          <input className="file-selector__input" type="file" accept={props.accept} multiple onChange={onChange} />
        </label>
        <button className={classWithModifiers("file-selector-multiple__arrow", expanded && "expanded")} type="button" onClick={toggleState(setExpanded)}>
          <Icon name="arrow-up" />
        </button>
      </div>

      <Expander expanded={expanded}>
        <div className="file-selector-multiple__files">
          {files.map((file, index) => (
            <FileSelectorFile file={file} index={index} onRemoveAnimationEnd={removeFile} key={FileUtils.getId(file)} />
          ))}
        </div>
      </Expander>
    </div>
  )
}

export default FileSelectorMultiple


interface FileSelectorMultipleSingleProps extends FileSelectorBaseProps {
  file?: File
  onClear?(): void
  onChange?(event: ChangeEvent<HTMLInputElement>): void
}

function FileSelectorMultipleSingle(props: FileSelectorMultipleSingleProps) {
  return (
    <label className="file-selector__container">
      {props.label && (
        <div className="file-selector__label">{props.label}</div>
      )}
      <div className="file-selector-multiple__field">
        <Icon name="square-plus" />
        <div className={classWithModifiers("file-selector__appearance", !!props.file && "filled")}>{props.file?.name ?? props.placeholder ?? "Choose file"}</div>
      </div>

      <input className="file-selector__input" type="file" accept={props.accept} multiple onChange={props.onChange} />
      <button className="file-selector-empty" type="button" onClick={props.onClear}>
        <Icon className="file-selector-empty__icon" name="trash-bin" />
      </button>
    </label>
  )
}


interface FileSelectorFileProps {
  /**
   * Required for "swipe-in" animation.
   */
  index?: number
  file: File
  onRemove?(file: File): void
  /**
   * The same as `onRemove` but waits for swiping transition to end.
   */
  onRemoveAnimationEnd?(file: File): void
}

function FileSelectorFile(props: FileSelectorFileProps) {
  const [removed, setRemoved] = useState(false)

  function onRemove() {
    setRemoved(true)
    props.onRemove?.(props.file)
  }

  function onRemoveAnimationEnd() {
    if (!removed) return

    props.onRemoveAnimationEnd?.(props.file)
  }

  const fileURL = useFilePreview(props.file)

  return (
    <div className={classWithModifiers("file-selector-file", removed && "removed")} style={{ "--index": props.index }} onAnimationEnd={onRemoveAnimationEnd}>
      <img src={fileURL} alt="file preview" className="file-selector-file__preview" />
      <div className="file-selector-file__name">
        <span>{props.file.name}</span>
      </div>
      <button className="file-selector-empty" type="button" onClick={onRemove}>
        <Icon name="trash-bin" />
      </button>
    </div>
  )
}
