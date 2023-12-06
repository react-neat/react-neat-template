import { ReactNode } from "react"

import ErrorCover from "@/app/components/ErrorCover/ErrorCover"
import Button from "@/ui/intrinsic/Button/Button"
import TextBox from "@/ui/layout/TextBox/TextBox"

interface ClientErrorProps {
  title: ReactNode
  children?: ReactNode

  onReset?(): void
}

function ClientError(props: ClientErrorProps) {
  return (
    <ErrorCover>
      <TextBox>
        <h3>Error - {props.title}</h3>
        {props.children}
        <hr />
        <Button onClick={props.onReset}>Reset</Button>
      </TextBox>
    </ErrorCover>
  )
}

export default ClientError
