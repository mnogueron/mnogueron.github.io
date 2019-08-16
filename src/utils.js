import * as ReactGA from 'react-ga'

export const openNewTab = (url, gaAction) => {
  if (process.env.NODE_ENV === 'production' && gaAction) {
    ReactGA.event({
      category: 'Navigation',
      action: gaAction,
    })
  }

  const win = window.open(url, '_blank')
  win.focus()
}

export const GA = {
  navigateTo: (action) => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.event({
        category: 'Navigation',
        action,
      })
    }
  },
}
