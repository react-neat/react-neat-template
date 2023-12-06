export interface Changeable<Value> {
  defaultValue: Value
  onChange(value: Value): void
}

export interface Selectable<ID> {
  selectedIds: ID[]
  onSelect(ids: ID[]): void
}

export interface Fillable {
  /**
   * Used in forms to represent a key of value.
   */
  name: string
  /**
   * Validates the value. Shows error.
   */
  validity?: string | null | false
}



export interface POSOrder {
  items: POSOrderItem[]

  taxPrice: number
  finalPrice: number
}

export interface POSOrderItem {
  name: string
  quantity: number
  price: number
  modifiers: string[]
}
