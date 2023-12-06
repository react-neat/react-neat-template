import { startCase } from "lodash"

import Enum from "@/utils/tools/enum"
import { EnumType } from "@/utils/types"

import { SelectorOptionElement } from "./Selector.types"

/**
 * @param useStartCase - whether or not transform keys to start case (default `false`).
 *
 */
export function optionsFromEntries(entries: [key: string | number, value: string | number][], useStartCase = false): SelectorOptionElement[] {
  return entries.map(([key, value], index) => (
    <option value={value} key={index}>{useStartCase ? startCase(String(key)) : key}</option>
  ))
}

/**
 * @param startCase - whether or not transform keys to start case (default `true`).
 *
 */
export function optionsFromEnum(enumerator: EnumType<never>, startCase = true): SelectorOptionElement[] {
  return optionsFromEntries(Enum.entries(enumerator), startCase)
}


export const TrueFalseOptions = [
  <option value={1} key={1}>True</option>,
  <option value={0} key={0}>False</option>
]
