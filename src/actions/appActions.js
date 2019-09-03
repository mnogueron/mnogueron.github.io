import { SET_LOCALE, SET_REACT_EASY_PANZOOM_LATEST_VERSION } from '../reducers/appReducer'

export const setLocale = (locale) => {
  return {
    type: SET_LOCALE,
    locale,
  }
}

export const setReactEasyPanZoomLatestVersion = (version) => {
  return {
    type: SET_REACT_EASY_PANZOOM_LATEST_VERSION,
    version,
  }
}
