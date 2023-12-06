import { Suspense } from "react"
import { Toaster } from "react-hot-toast"
import { ModalContainer } from "react-modal-global"

import UserAuthService from "@/app/user/UserAuthService"
import Modal from "@/services/Modal/Modal"

/**
 * Includes services, which effects behavior of the app.
 */
function AppServices() {
  return (
    <>
      <Suspense>
        <UserAuthService />
      </Suspense>

      <ModalContainer controller={Modal} />
      <Toaster toastOptions={{ duration: 5 * 1000 }} position="top-right" />
    </>
  )
}

export default AppServices
