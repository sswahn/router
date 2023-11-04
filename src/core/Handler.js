import { useState, useContext, useEffect, Suspense } from 'react'
import { RouterContext } from './Provider.js'
const RouteCache = new Map()

export default function Handler({ routes, notFound, lazyFallback }) {
  const [route, setRoute] = useState(window.location.pathname || '/')
  const {context, dispatch} = useContext(RouterContext)

  const matchRoute = path => {
    if (RouteCache.has(path)) {
      return RouteCache.get(path)
    }
    const matchedRoute = routes.find(({ path: routePath }) => {
      const pathSegments = path.split('/').filter(Boolean)
      const routeSegments = routePath.split('/').filter(Boolean)
      return (
        pathSegments.length === routeSegments.length &&
        routeSegments.every((segment, index) => segment.startsWith(':') || segment === pathSegments[index])
      )
    })
    const component = matchedRoute ? matchedRoute.component : null
    RouteCache.set(path, component)
    return component
  }

  const renderComponent = () => {
    const MatchedComponent = matchRoute(route)
    return MatchedComponent ? <MatchedComponent /> : <NotFound />
  }
  
  const handleRouteChange = () => {
    dispatch({ type: 'router', payload: window.location.pathname })
  }
  
  useEffect(() => {
    // handles browser navigation: back/forward buttons
    window.addEventListener('popstate', handleRouteChange)
    return () => {
      window.removeEventListener('popstate', handleRouteChange)
    }
  }, [])
  
  useEffect(() => {
    // handles programatic navigation: navigateTo
    if (context.router === window.location.pathname) {
      setRoute(context.router)
    }
  }, [context.router])

  return lazyFallback ? (
    <Suspense fallback={<lazyFallback />}>
      {renderComponent()}
    </Suspense>
  ) : renderComponent()
}
