import "./BaseLayout.scss"

import { ReactNode } from "react"

import ErrorBoundary from "@/app/boundaries/ErrorBoundary/ErrorBoundary"
import { ClientErrorFallback } from "@/app/errors"


interface BaseLayout {
  children?: ReactNode
}

function BaseLayout(props: BaseLayout) {
  return (
    <div className="base-layout">
      <ErrorBoundary fallback={ClientErrorFallback}>
        {props.children}
      </ErrorBoundary>
    </div>
  )
}

export default BaseLayout
