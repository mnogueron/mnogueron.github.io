import 'es5-shim'
import 'es6-shim'

import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core'
import * as ReactGA from 'react-ga'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#B2DFDB',
      main: '#009688',
      dark: '#00796B',
      contrastText: '#fff',
    },
    secondary: {
      light: '#FFECB3',
      main: '#FFC107',
      dark: '#FFA000',
      contrastText: '#212121',
    },
  },
})

if (process.env.NODE_ENV === 'production') {
  ReactGA.initialize('UA-143826195-1')
  ReactGA.pageview('Homepage')
}

function WrappedApp () {
  return (
    <ThemeProvider theme={theme}>
      <App/>
    </ThemeProvider>
  )
}

ReactDOM.render(<WrappedApp/>, document.getElementById('root'))
registerServiceWorker()
