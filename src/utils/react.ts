import { Dispatch, ReactNode, SetStateAction, SyntheticEvent } from "react"

import { NoInfer } from "./types"

export function toggleState(setAction: Dispatch<SetStateAction<boolean>>): () => void {
  return () => setAction(state => !state)
}

export function inputValue<M = string>(callback?: (value: NoInfer<M>) => void, map?: (value: string) => M) {
  return (event: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (callback == null) return

    const value = event.currentTarget.value
    const valueMapped = map?.(value)

    callback((valueMapped ?? value) as M)
  }
}

/**
 * Stops propagation from container. Callback exists only on the `current` target
 * @param callback any function
 * @returns mouse event handler
 */
export function stopPropagation(callback?: () => void | null) {
  return ({ target, currentTarget }: Event | SyntheticEvent) => {
    if (target instanceof Element && currentTarget instanceof Element) {
      if (target !== currentTarget) return
    }

    callback?.()
  }
}

/**
 * Stringifies `ReactNode`. If have `children`, stringifies all recursively.
 */
export function getReactNodeTextContent(node: ReactNode): string {
  if (node == null) return ""

  switch (typeof node) {
    case "string":
    case "number":
    case "boolean":
      return node.toString()

    case "object": {
      if (node instanceof Array) {
        return node.map(getReactNodeTextContent).join("")
      }

      if ("props" in node) {
        return getReactNodeTextContent(node.props.children)
      }

      throw new TypeError("Unknown `node` object", { cause: { type: typeof node, node } })
    }

    default:
      throw new TypeError("Unresolved `node` of type", { cause: { type: typeof node, node } })
  }
}
