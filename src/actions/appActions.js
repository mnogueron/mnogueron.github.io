import { SET_LOCALE } from '../reducers/appReducer'

export const setLocale = (locale) => {
  return {
    type: SET_LOCALE,
    locale,
  }
}
