import React, { useEffect } from 'react'
import { ThemeProvider } from '@material-ui/styles'
import { IntlProvider } from 'react-intl'
import { getMessages, getUserLocale } from './i18n'
import App from './App'
import { useDispatch, useSelector } from 'react-redux'
import { setLocale } from './actions/appActions'
import theme from './theme'

const Root = () => {
  const userLocale = useSelector(state => state.app.locale)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!userLocale) {
      dispatch(setLocale(getUserLocale()))
    }
  }, [dispatch, userLocale])

  const locale = userLocale || getUserLocale()

  return (
    <ThemeProvider theme={theme}>
      <IntlProvider
        key={locale}
        locale={locale}
        messages={getMessages(locale)}
      >
        <App/>
      </IntlProvider>
    </ThemeProvider>
  )
}

export default Root
