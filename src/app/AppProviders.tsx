import { QueryClientProvider } from "@tanstack/react-query"
import { ReactNode, Suspense } from "react"
import { Provider as StoreProvider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

import queryClient from "@/api/client"
import { FatalErrorFallback } from "@/app/errors"
import store, { persistor } from "@/store/store"

import ErrorBoundary from "./boundaries/ErrorBoundary/ErrorBoundary"

interface AppProvidersProps {
  children: ReactNode
}

/**
 * Includes providers like `Redux`.
 */
function AppProviders(props: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Suspense fallback="Loading">
            <ErrorBoundary fallback={FatalErrorFallback}>
              {props.children}
            </ErrorBoundary>
          </Suspense>
        </PersistGate>
      </StoreProvider>
    </QueryClientProvider>
  )
}

export default AppProviders
