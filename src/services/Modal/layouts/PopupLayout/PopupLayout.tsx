import "./PopupLayout.scss"

import { ReactNode } from "react"
import { useModalWindow } from "react-modal-global"

import ButtonIcon from "@/ui/intrinsic/Button/ButtonIcon"

interface PopupLayoutProps {
  width?: string

  title: ReactNode
  children: ReactNode
}

function PopupLayout(props: PopupLayoutProps) {
  const modal = useModalWindow()
  return (
    <div className="popup-layout" style={{ width: props.width }}>
      <div className="popup-layout__close">
        <ButtonIcon name="cross" color="transparent" size="small" onClick={modal.close} ariaLabel="Close popup" />
      </div>
      <div className="popup-layout__container">
        <h3 className="popup-layout__title">{props.title}</h3>
        {props.children}
      </div>
    </div>
  )
}

export default PopupLayout
