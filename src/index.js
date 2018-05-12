import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'

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
    <MuiThemeProvider theme={theme}>
      <App/>
    </MuiThemeProvider>
  )
}

ReactDOM.render(<WrappedApp/>, document.getElementById('root'))
registerServiceWorker()
