import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#B3E5FC',
      main: '#03A9F4',
      dark: '#0288D1',
      contrastText: '#fff',
    },
    secondary: {
      light: '#B2EBF2',
      main: '#00BCD4',
      dark: '#0097A7',
      contrastText: '#fff',
    },
  },
})

function WrappedApp () {
  return (
    <MuiThemeProvider theme={theme}>
      <App/>
    </MuiThemeProvider>
  )
}

ReactDOM.render(<WrappedApp/>, document.getElementById('root'))
registerServiceWorker()
