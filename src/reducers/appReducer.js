export const SET_LOCALE = 'SET_LOCALE'

const initialState = {
  locale: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCALE:
      return {
        ...state,
        locale: action.locale,
      }

    default:
      return state
  }
}

