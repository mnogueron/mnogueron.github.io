export const openNewTab = (url) => {
  const win = window.open(url, '_blank')
  win.focus()
}
