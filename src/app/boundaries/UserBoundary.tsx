import { ReactNode } from "react"

import { useAppSelector } from "@/store/hooks"
import { UserRole } from "@/store/reducers/user/types"

export interface UserBoundaryProps {
  /**
   * The least user privileges that user should have to get access.
   *
   * `undefined` means any user.
   */
  userType?: UserRole
  /**
   * If not presented, default fallback will be used.
   */
  fallback?: ReactNode
  children: ReactNode
}

function UserBoundary(props: UserBoundaryProps) {
  const user = useAppSelector(state => state.user)

  if (props.userType != null && user.type < props.userType) {
    return <>{props.fallback}</>
  }

  return <>{props.children}</>
}

export default UserBoundary
