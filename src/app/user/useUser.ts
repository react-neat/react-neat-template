import { useEffect, useMemo } from "react"
import toast from "react-hot-toast"

import { useAPIRetrieve } from "@/api/stable/hooks"
import { mapUser } from "@/api/stable/mappings/user"
import useObservableLocalStorage from "@/utils/hooks/useObservableLocalStorage"
import JWT from "@/utils/tools/jwt"


function useUser() {
  const [userToken, , removeUserToken] = useObservableLocalStorage<string>("user-token")
  const id = useMemo<string | null>(() => {
    if (userToken == null) return null

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const jwt = new JWT<any>(userToken)
      return jwt.payload.userData.id
    } catch (error) {
      console.error(error)
      toast.error("JWT Token Parsing has failed")
      toast.custom("You've been logged out")
      removeUserToken()
      return null
    }
  }, [userToken])

  const user = useAPIRetrieve("/users/{id}", { pathParams: { id: id as string } }, { enabled: id != null })
  useEffect(() => {
    if (user?.status === 401) removeUserToken()
  }, [user])

  if (user?.payload == null) return null
  return mapUser(user.payload)
}

export default useUser
