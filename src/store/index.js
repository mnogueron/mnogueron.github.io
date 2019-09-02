import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { registerStore, getStore } from './storeRegistry'
import reducers from '../reducers'

export const initStore = () => {
  const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

  const store = createStore(
    combineReducers(reducers),
    composeEnhancers(
      applyMiddleware(thunk),
    ),
  )

  registerStore(store)
  return store
}

export {
  registerStore,
  getStore,
}
