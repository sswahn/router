
const Router = ({ routes, notFound, beforeRouteChange, afterRouteChange }) => {
  const matchRoute = path => {
    const matchedRoute = routes.find(({ path: routePath }) => {
      const pathSegments = path.split('/').filter(Boolean)
      const routeSegments = routePath.split('/').filter(Boolean)
      return (
        pathSegments.length === routeSegments.length &&
        routeSegments.every(
          (segment, index) => segment.startsWith(':') || segment === pathSegments[index]
        )
      )
    })
    return matchedRoute || null
  }

  const renderComponent = route => {
    const MatchedRoute = matchRoute(route)
    if (MatchedRoute) {
      if (beforeRouteChange) {
        beforeRouteChange(route)
      }
      return MatchedRoute.component()
    }
    if (notFound) {
      return notFound()
    } else {
      throw new Error('Route not found.')
    }
  }

  const handleRouteChange = event => {
    const path = event.state 
      ? event.state.path 
      : window.location.pathname
    renderComponent(path)
    if (afterRouteChange) {
      afterRouteChange(path)
    }
  }

  //window.addEventListener('popstate', handleRouteChange)
    // Listen for popstate events when the user navigates using the browser's back/forward buttons
  window.addEventListener('popstate', handleRouteChange)

  // Listen for pushstate events when you use history.pushState
  window.addEventListener('pushstate', handleRouteChange)

  return renderComponent(window.location.pathname || '/')
}

export default Router
