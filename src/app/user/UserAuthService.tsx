import { useEffect } from "react"

import { useAppDispatch } from "@/store/hooks"
import { USER_GUEST, userUpdate } from "@/store/reducers/user"

import useUser from "./useUser"
import useUserToken from "./useUserToken"


/**
 * Supplies redux store with fetched user.
 */
function UserAuthService() {
  const user = useUser()
  const userToken = useUserToken()
  const dispatch = useAppDispatch()


  useEffect(() => {
    if (user == null) return
    if (userToken == null) return

    dispatch(userUpdate(user))
  }, [user, userToken])

  useEffect(() => {
    if (user != null) return
    if (userToken != null) return

    dispatch(userUpdate(USER_GUEST))
  }, [user, userToken])


  return null
}

export default UserAuthService
