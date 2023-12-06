
import { ErrorInfo } from "react"

import Button from "@/ui/intrinsic/Button/Button"

interface FatalErrorProps {
  reset?: () => void
  error?: Error
  errorInfo?: ErrorInfo
}

function FatalError(props: FatalErrorProps) {
  function report() {
    const error = props.error
    if (error == null) return

    //! No reporting implementation.
  }
  return (
    <div className="fatal-error">
      <div className="fatal-error__container">
        <h1>FATAL</h1>
        <div className="fatal-error__desc">
          <h3>Unexpected error ocurred</h3>
          <p>Name:</p>
          <pre>{props.error?.name}</pre>
          <p>Message:</p>
          <pre>{props.error?.message}</pre>
          <p>Stack:</p>
          <pre>{props.error?.stack}</pre>
          <p>Component stack:</p>
          <pre>{props.errorInfo?.componentStack}</pre>
        </div>
        <Button onClick={report}>Report</Button>
        <Button onClick={props.reset}>Reset (might solve issue)</Button>
      </div>
    </div>
  )
}

export default FatalError
