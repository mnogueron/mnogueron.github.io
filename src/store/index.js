import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { registerStore, getStore } from './storeRegistry'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import reducers from '../reducers'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['app'],
}

const persistedReducer = persistReducer(persistConfig, combineReducers(reducers))

export const initStore = () => {
  const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

  const store = createStore(
    persistedReducer,
    composeEnhancers(
      applyMiddleware(thunk),
    ),
  )

  registerStore(store)
  let persistor = persistStore(store)
  return { store, persistor }
}

export {
  registerStore,
  getStore,
}
