import { useState, useContext, useEffect, Suspense } from 'react'
import { RouterContext } from './Provider.js'
const RouteCache = new Map()

export default function Handler({ notFound, lazyFallback, children }) {
  const [route, setRoute] = useState(window.location.pathname || '/')
  const {context, dispatch} = useContext(RouterContext)
  
  const matchRoute = path => {
    if (RouteCache.has(path)) {
      return RouteCache.get(path)
    }
    const matchedRoute = children.find((child) => {
      return child.props.path && child.props.path === path
    })
    const component = matchedRoute ? matchedRoute.props.component : null
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
