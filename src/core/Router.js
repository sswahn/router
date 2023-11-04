let route = window.location.pathname || '/'

const Router = ({ routes, notFoundComponent, beforeRouteChange, afterRouteChange }) => {
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

  const renderComponent = () => {
    const MatchedRoute = matchRoute(route)
    if (MatchedRoute) {
      if (beforeRouteChange) {
        beforeRouteChange(route)
      }
      return MatchedRoute.component()
    }
    return notFoundComponent ? notFoundComponent() : NotFoundComponent()
  }

  const handleRouteChange = () => {
    if (afterRouteChange) {
      afterRouteChange(window.location.pathname)
    }
    route = window.location.pathname
  }

  window.addEventListener('popstate', handleRouteChange)

  return renderComponent()
}

export default Router
