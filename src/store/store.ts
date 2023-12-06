import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"

import reducers from "./reducers"

const combinedReducers = combineReducers(reducers)
const persistedReducer = persistReducer({
  key: `root-${import.meta.env.VITE_NAME}-${import.meta.env.VITE_VERSION}-${import.meta.env.MODE}`,
  storage
}, combinedReducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    // Disabling this as it conflicts with "redux-persist"
    serializableCheck: false
  }),
})

export const persistor = persistStore(store)

export default store
