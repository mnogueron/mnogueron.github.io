import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core'

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

function WrappedApp () {
  return (
    <ThemeProvider theme={theme}>
      <App/>
    </ThemeProvider>
  )
}

ReactDOM.render(<WrappedApp/>, document.getElementById('root'))
registerServiceWorker()
