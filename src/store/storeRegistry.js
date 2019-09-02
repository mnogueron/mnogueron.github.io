let activeStore = null

export const registerStore = (store) => {
  activeStore = store
}

export const getStore = () => {
  return activeStore
}
