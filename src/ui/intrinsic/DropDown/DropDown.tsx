import "./DropDown.scss"

import { castArray } from "lodash"
import { ComponentProps, ReactElement, ReactNode, useEffect, useMemo, useRef, useState } from "react"

import { classWithModifiers } from "@/utils/bem"
import InfiniteScroll from "@/utils/components/InfiniteScroll"
import { getReactNodeTextContent } from "@/utils/react"

type DropDownOption = ReactElement<ComponentProps<"option">>
type DropDownChildren = DropDownOption | DropDownOption[]

interface DropDownProps<V> {
  name?: string
  /**
   * Open in up direction.
  */
  upwards?: boolean
  size?: "small" | "big"
  expanded: boolean

  optionClassName?: string

  defaultValue?: V
  onSelect(option: DropDownOption): void

  /**
   * Filters options. Works the same as `Array.filter`.
   */
  filterPredicate?: (value: V, children: string) => unknown

  children: DropDownChildren | DropDownChildren[]
  /**
   * Placed in the end of the list.
   */
  bottom?: ReactNode
}

function DropDown<V = string | undefined>(props: DropDownProps<V>) {
  const { options, optionsFiltered, initialOptionIndex } = useDropDownOptions(props)

  const elementRef = useRef<HTMLDivElement>(null)

  const [choice, Choose] = useState<number>(initialOptionIndex)
  const choicePointer = useRef<number>(initialOptionIndex)

  /**
   * https://jsfiddle.net/cxe73c22/
   */
  function scrollCurrentChoiceIntoView() {
    if (elementRef.current == null) return

    const element = elementRef.current
    const parentElementRect = element.getBoundingClientRect()

    const choiceElement = element.children.item(choice)
    const choiceElementRect = choiceElement?.getBoundingClientRect()
    if (choiceElementRect == null) return

    const offsetTop = choiceElementRect.top - parentElementRect.top
    const middle = offsetTop - (parentElementRect.height / 2) + (choiceElementRect.height / 2)

    element.scrollBy(0, middle)
  }

  function loop(number: number, max: number): number {
    if (number > max) return 0
    if (number < 0) return max

    return number
  }

  function focusOption(optionIndex: number) {
    if (elementRef.current == null) return

    const choiceElement = elementRef.current.children.item(optionIndex)
    if (!(choiceElement instanceof HTMLElement)) return

    choiceElement.focus()
  }

  function onPointerChange(by: 1 | -1) {
    const newChoicePointer = choicePointer.current + by
    const newChoicePointerLooped = loop(newChoicePointer, options.length - 1)

    focusOption(newChoicePointerLooped)
    choicePointer.current = newChoicePointerLooped
  }

  function onKeyDown(event: KeyboardEvent) {
    if (!["ArrowUp", "ArrowDown"].includes(event.key)) return
    if (!props.expanded) return
    if (elementRef.current == null) return

    event.preventDefault()

    if (event.key === "ArrowUp") onPointerChange(-1)
    if (event.key === "ArrowDown") onPointerChange(+1)
  }

  function isOptionSelected(option: DropDownOption): boolean {
    const currentOption = options[choice]
    if (currentOption == null) return false

    return currentOption.props.value === option.props.value
  }

  useEffect(() => {
    if (!props.expanded) return

    scrollCurrentChoiceIntoView()
  }, [props.expanded]) // Should only be updated when `props.expanded` changes.

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown)
    return () => {
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [onKeyDown])

  return (
    <div className={classWithModifiers("drop-down", props.size, props.expanded && "expanded", props.upwards && "upwards")} role="listbox" aria-expanded={props.expanded} ref={elementRef}>
      <InfiniteScroll pageSize={20} elementRef={elementRef}>
        {optionsFiltered.map((option, index) => (
          <button
            className={classWithModifiers("drop-down__option", isOptionSelected(option) && "selected")}
            onClick={() => (Choose(index), props.onSelect(option))}
            role="option"
            type="button"
            disabled={!props.expanded}
            key={String(option.props.value)}
          >
            {option.props.children}
          </button>
        ))}
        {props.bottom}
      </InfiniteScroll>
    </div>
  )
}

export default DropDown

function useDropDownOptions<V>(props: DropDownProps<V>) {
  function filterOptions(options: ReactElement<ComponentProps<"option">>[]) {
    if (props.filterPredicate == null) {
      return options
    }

    const filteredOptions = options.filter(option => {
      const optionValue = option.props.value as V
      const optionChildren = getReactNodeTextContent(option)

      return props.filterPredicate?.(optionValue, optionChildren)
    })
    return filteredOptions
  }

  return useMemo(() => {
    const options = castArray(props.children).flat(2)
    const optionsFiltered = filterOptions(options)

    const initialOptionIndex = props.defaultValue ? optionsFiltered.findIndex(option => option.props.value === props.defaultValue) : -1

    return { options, optionsFiltered, initialOptionIndex }
  }, [props.children, props.defaultValue, filterOptions])
}
