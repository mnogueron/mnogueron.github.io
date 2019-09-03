export const SET_LOCALE = 'SET_LOCALE'
export const SET_REACT_EASY_PANZOOM_LATEST_VERSION = 'SET_REACT_EASY_PANZOOM_LATEST_VERSION'

const initialState = {
  locale: null,
  reactEasyPanZoomLatestVersion: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCALE:
      return {
        ...state,
        locale: action.locale,
      }

    case SET_REACT_EASY_PANZOOM_LATEST_VERSION:
      return {
        ...state,
        reactEasyPanZoomLatestVersion: action.version,
      }

    default:
      return state
  }
}

