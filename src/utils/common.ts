import { NoInfer } from "./types"

/**
 * Interpolates {variable} in string.
 */
export function interpolate<T extends string>(value: T, vars: Record<string, string | number>): string {
  const varKeys = Object.keys(vars)
  return varKeys.reduce((result, next) => result.replace(new RegExp(`{${next}}`, "g"), String(vars[next])), value)
}

export function targetValue<M = string, V = string>(callback: (value: NoInfer<M>) => void, map?: (value: V) => M) {
  return (value: V) => {
    const valueMapped = map?.(value)

    callback((valueMapped ?? value) as M)
  }
}

/**
 * Continues the array, creating minimum fill level of the array by duplicating its items.
 *
 * It **doesn't** mutate original `array`.
 * @returns new array
 */
export function minFill<T>(array: T[], minLevel?: number): T[] {
  if (array.length === 0) return array
  if (!minLevel || (array.length >= minLevel)) {
    return array
  }

  const newArray: T[] = []
  for (let i = 0; i < (minLevel - array.length); i++) {
    newArray.push(...array.slice(0, minLevel - newArray.length))
  }
  return newArray
}

/**
 * https://stackoverflow.com/questions/38304401/javascript-check-if-dictionary/71975382#71975382
 */
export function isRecord(object: unknown): object is Record<keyof never, unknown> {
  return object instanceof Object && object.constructor === Object
}

export function pluralize(count: number, noun: string, suffix = "s") {
  return `${count} ${noun}${count !== 1 ? suffix : ""}`
}

export function addOrRemove<T>(elements: T[], element: T): T[] {
  if (elements.includes(element)) {
    return elements.filter(oldElement => oldElement !== element)
  }

  return [...elements, element]
}
