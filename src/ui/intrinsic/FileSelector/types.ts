import { ReactNode } from "react"

export interface FileSelectorBaseProps {
  label?: ReactNode
  /**
   * @default
   * "Choose image"
   */
  placeholder?: ReactNode
  accept?: string
  clearable?: boolean
}
