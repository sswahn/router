export const navigateTo = path => {
  window.history.pushState({}, '', path)
  window.dispatchEvent(new CustomEvent('routechange', { detail: { path } }))
}
