export const navigateTo = path => {
  window.history.pushState({}, '', path)
  window.dispatchEvent(new Event('routechange'))
}
