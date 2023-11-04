export const navigateTo = path => {
  history.pushState(null, '', path)
}
