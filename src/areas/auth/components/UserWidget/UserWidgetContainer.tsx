import { toast } from "react-hot-toast"

import LocalStorageKey from "@/services/LocalStorage/LocalStorageKey"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { userReset } from "@/store/reducers/user"
import ObservableLocalStorage from "@/utils/tools/observableLocalStorage"

import UserWidget from "./UserWidget"

function UserWidgetContainer() {
  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()

  function onExit() {
    dispatch(userReset())

    ObservableLocalStorage.removeItem(LocalStorageKey.UserToken)

    toast.success("You have been logged out")
  }

  if (!user.signed) {
    return null
  }

  return (
    <UserWidget user={user} onExit={onExit} />
  )
}

export default UserWidgetContainer
