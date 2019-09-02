import 'es5-shim'
import 'es6-shim'

import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux'
import * as ReactGA from 'react-ga'
import { initStore } from './store'
import Root from './Root'

const store = initStore()

if (process.env.NODE_ENV === 'production') {
  ReactGA.initialize('UA-143826195-1')
  ReactGA.pageview('Homepage')
}

function WrappedApp () {
  return (
    <Provider store={store}>
      <Root/>
    </Provider>
  )
}

ReactDOM.render(<WrappedApp/>, document.getElementById('root'))
registerServiceWorker()
