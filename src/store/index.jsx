import { configureStore } from '@reduxjs/toolkit'
import { save, load } from 'redux-localstorage-simple'
import authReducer from './reducer/auth'

const PERSISTED_KEYS = ['authReducer']

const store = () =>
  configureStore({
    reducer: {
     
      authReducer,

    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: false }).concat(
        // Use save middleware only on the client side
        typeof window !== 'undefined'
          ? save({ states: PERSISTED_KEYS, debounce: 1000 })
          : () => (next) => (action) => next(action)
      ),
    // Handle preloaded state only on the client side
    preloadedState:
      typeof window !== 'undefined' ? load({ states: PERSISTED_KEYS }) : {}
  })

export { store }