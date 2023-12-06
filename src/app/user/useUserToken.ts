import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"

import useObservableLocalStorage from "@/utils/hooks/useObservableLocalStorage"

export const SEARCH_PARAMS_TOKEN = "access-token"

/**
 * Checks if it's presented in `search query`.
 *
 * If it's presented, it will be saved to `localStorage`
 * and `token` field will be removed from `search query`.
 */
function useUserToken(): string | undefined {
  const [userToken, setUserToken] = useObservableLocalStorage<string>("user-token")
  const [searchParams, setSearchParams] = useSearchParams()
  // Try to get token from search params.
  useEffect(() => {
    const token = searchParams.get(SEARCH_PARAMS_TOKEN)
    if (token == null) return

    setUserToken(token)
    setSearchParams([])
  }, [searchParams])

  return userToken
}

export default useUserToken
