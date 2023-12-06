import { mapValues } from "lodash"
import { useMemo } from "react"

import { Changeable } from "@/app/types"

type ChangeableSpreads<T> = {
  readonly [K in keyof T]: Changeable<T[K]>
}

/**
 * @returns `defaultValue` and `onChange` to be spread for a component.
 *
 * It helps to short the amount of code, so you write
 * ```tsx
 * const { settings, updateTabSettings } = useSettings()
 * const orderSettingsSpreads = useChangeableSpreads(settings.order ?? {}, (value) => updateTabSettings("order", value))
 *
 * <FontFamilySelector {...orderSettingsSpreads.fontFamily} />
 * ```
 * Instead of
 * ```tsx
 * <FontFamilySelector defaultValue={orderSettings.fontFamily} onChange={fontFamily => setOrderSettings({ fontFamily })} />
 * ```
 */
function useChangeableSpreads<T extends object>(object: Partial<T>, onUpdate: (value: Partial<T>) => void): ChangeableSpreads<T> {
  function getChangeableProps<Property extends keyof T>(property: Property) {
    if (!Object.hasOwn(object, property)) return

    return {
      defaultValue: object[property],
      onChange: (value: T[Property]) => onUpdate({ [property]: value } as never)
    }
  }

  return useMemo(() => {
    const propsSpreads = mapValues(object, (_value, key) => getChangeableProps(key as never))
    return propsSpreads as never
  }, [object, getChangeableProps])
}

export default useChangeableSpreads
