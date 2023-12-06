import "./Header.scss"

import { UserWidgetContainer } from "@/areas/auth"

import Logo from "../Logo/Logo"

function Header() {
  return (
    <header className="header">
      <Logo />
      <UserWidgetContainer />
    </header>
  )
}

export default Header
