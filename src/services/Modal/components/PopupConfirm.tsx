import { JSXElementConstructor, useState } from "react"
import { useModalWindow } from "react-modal-global"
import { useInterval } from "react-use"

import Button from "@/ui/intrinsic/Button/Button"
import Buttons from "@/ui/layout/Buttons/Buttons"

import PopupLayout from "../layouts/PopupLayout/PopupLayout"
import Modal from "../Modal"

interface PopupConfirmProps {
  onConfirm?(): void
}

function PopupConfirm(props: PopupConfirmProps) {
  const modal = useModalWindow()
  const [timer, setTimer] = useState(3)

  useInterval(() => setTimer(timer => timer - 1), 1000)

  function onConfirm() {
    modal.close()
    props.onConfirm?.()
  }

  return (
    <PopupLayout title="Confirm action">
      <Buttons>
        <Button color="gray" disabled={timer > 0} onClick={onConfirm}>{timer > 0 ? ("Wait " + timer) : "Confirm"}</Button>
        <Button color="dark" onClick={modal.close}>Cancel</Button>
      </Buttons>
    </PopupLayout>
  )
}

/**
 * Opens modal to confirm an action.
 *
 * @example
 * async function action() {
 *  if (!await confirmAction()) return
 *
 *  // ...
 * }
 */
export async function confirmAction(component?: JSXElementConstructor<{ onConfirm?: () => void }>) {
  let confirmed = false
  const onConfirm = () => confirmed = true
  await Modal.open(component ?? PopupConfirm, { id: Date.now(), onConfirm })

  return confirmed
}

export default PopupConfirm
