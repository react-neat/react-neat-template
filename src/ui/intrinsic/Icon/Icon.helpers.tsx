import Icon from "./Icon"
import { IconLike } from "./Icon.types"

/**
 * Converts `IconLike` to `Icon` element.
 */
export function normalizeIconLike(icon?: IconLike | null) {
  if (icon == null) return null

  // Icon Name.
  if (typeof icon === "string") {
    if (icon.length === 0) return null

    return <Icon name={icon} />
  }

  // Icon element.
  return icon
}
