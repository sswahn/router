import { useState, useEffect, Children, Suspense } from 'react'

const Router = ({ lazyFallback: LazyFallback, children }) => {
  const [path, setPath] = useState(window.location.pathname)

  const route = Children.toArray(children).find(child => {
    return !child.props.path || path === child.props.path
  })

  const handleLazyFallback = () => {
    if (LazyFallback) {
      return LazyFallback()
    }
  }
  
  const handlePopState = event => {
    setPath(window.location.pathname)
  }

  const handleRouteChange = event => {
    setPath(event.detail.path)
  }

  useEffect(() => { // handles browser navigation: back/forward
    window.addEventListener('popstate', handlePopState)

    /* Handle initial/direct page load by setting the path. needs testing.
    if (window.location.pathname !== path) {
      setPath(window.location.pathname);
    } */
    
    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])
  
  useEffect(() => { // handles programmatic navigation
    window.addEventListener('routechange', handleRouteChange)
    return () => {
      window.removeEventListener('routechange', handleRouteChange)
    }
  }, [])
  
  return (
    <Suspense fallback={handleLazyFallback()}>
      {route}
    </Suspense>
  )
}

export default Router
