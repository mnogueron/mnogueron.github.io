import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/styles'
import { IntlProvider } from 'react-intl'
import theme from './theme'
import { getMessages } from './i18n'

const TestProviders = (props) => {
  const { store, locale, children } = props
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <IntlProvider locale={locale} messages={getMessages(locale)}>
          {children}
        </IntlProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default TestProviders
