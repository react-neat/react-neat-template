import "@/assets/scss/reset.scss"
import "@/assets/scss/base.scss"
import "react-modal-global/styles/modal.scss"
import "@/services/Modal/Modal.scss"

import { Routes } from "@generouted/react-router"

import AppProviders from "@/app/AppProviders"

function App() {
  return (
    <AppProviders>
      <Routes />
    </AppProviders>
  )
}

export default App
