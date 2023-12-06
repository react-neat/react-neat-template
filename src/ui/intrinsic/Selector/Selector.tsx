import "./Selector.scss"

import { castArray } from "lodash"
import { Dispatch, ReactNode, useEffect, useMemo, useRef, useState } from "react"
import { LoaderIcon } from "react-hot-toast"
import { useClickAway } from "react-use"

import { classWithModifiers } from "@/utils/bem"
import { inputValue, toggleState } from "@/utils/react"

import { SelectorOptionElement } from "./Selector.types"

import Button from "../Button/Button"
import DropDown from "../DropDown/DropDown"
import Icon from "../Icon/Icon"

interface SelectorProps<V> {
  name?: string
  width?: string
  placeholder?: string
  /**
   * Open in up direction.
   */
  upwards?: boolean
  transparent?: boolean
  label?: ReactNode
  size?: "small" | "big"

  value?: V
  defaultValue?: V
  onChange?: Dispatch<V>

  pending?: boolean

  /**
   * Allows to create new element by using search box.
   *
   * @default
   * false
   */
  creatable?: boolean
  /**
   * Triggers on `Create` button click. Takes last value from search box.
   */
  onCreate?(value: string): void | Promise<void>

  /**
   * Allows using search box to filter options.
   *
   * @default
   * true
   */
  searchable?: boolean
  /**
   * Triggers on search value change.
   */
  onSearch?(search: string): void

  children: SelectorOptionElement | SelectorOptionElement[]
}

function Selector<V = string | undefined>(props: SelectorProps<V>) {
  const [search, setSearch] = useState("")
  const [expanded, setExpanded] = useState(false)
  const [currentOption, setCurrentOption] = useSelectorCurrentOption(props)

  function onSelect(option: SelectorOptionElement<V>) {
    props.onChange?.(option.props.value)

    setExpanded(false)
    setCurrentOption(option)
  }

  function onSearch(value: string) {
    props.onSearch?.(value)

    setSearch(value)
    setExpanded(true)
  }

  async function onCreate() {
    await props.onCreate?.(search)
  }

  function filterPredicate(_value: V, children: string): boolean {
    const searchLowerCased = search.toLowerCase()
    if (children.toLowerCase().includes(searchLowerCased)) {
      return true
    }

    return false
  }

  const elementRef = useRef<HTMLDivElement>(null)
  useClickAway(elementRef, () => setExpanded(false))

  useEffect(() => {
    if (!expanded) return
    if (currentOption == null) return

    setSearch("")
  }, [expanded, currentOption])

  const searchable = props.searchable ?? true
  const canSearch = searchable && expanded

  const createButton = (
    <Button size="small" color="transparent" disabled={props.pending} await onClick={onCreate}>
      {`Create "${search}"`}
      {props.pending && <LoaderIcon />}
    </Button>
  )

  return (
    <div className="selector" style={{ "--selector-width": props.width }} ref={elementRef}>
      {props.label && (
        <div className="selector__label">{props.label}</div>
      )}
      <button className={classWithModifiers("selector__appearance", props.size, props.transparent && "transparent")} type="button" onClick={toggleState(setExpanded)}>
        {canSearch && (
          <input
            className={classWithModifiers("selector__current", !currentOption && "gray")}
            autoFocus

            value={search}
            onChange={inputValue(onSearch)}
          />
        )}
        <div className={classWithModifiers("selector__current", !currentOption && "gray", canSearch && "hidden")}>
          {currentOption?.props.children ?? props.placeholder ?? "Choose"}
        </div>
        <Icon className={classWithModifiers("selector__icon", expanded && "up")} name="chevron-down" />
      </button>
      <DropDown
        name={props.name}
        size={props.size}
        upwards={props.upwards}
        defaultValue={props.defaultValue}

        expanded={expanded}
        onSelect={onSelect}

        filterPredicate={search.length > 0 ? filterPredicate : undefined}
        bottom={search.length > 0 && props.creatable && createButton}
      >
        {props.children}
      </DropDown>
      {props.name && (
        <input type="hidden" name={props.name} value={currentOption?.props.value} />
      )}
    </div>
  )
}

export default Selector

function useSelectorCurrentOption<V>(props: SelectorProps<V>) {
  const options = useMemo(() => castArray(props.children), [props.children])
  const initialOption = useMemo(() => getOptionByValue(props.defaultValue), [])

  const state = useState<SelectorOptionElement | null>(initialOption)
  const [currentOption, setCurrentOption] = state

  function getOptionByValue(value: V | null | undefined): SelectorOptionElement | null {
    if (value == null) return null

    return options.find(option => option.props.value === value) || null
  }

  useEffect(() => {
    if (props.value == null) return

    setCurrentOption(getOptionByValue(props.value))
  }, [props.value])

  // Refreshes `defaultValue` if children updates.
  useEffect(() => {
    if (currentOption != null) return

    setCurrentOption(getOptionByValue(props.defaultValue))
  }, [props.children])

  return state
}
