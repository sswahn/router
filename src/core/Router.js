import { useState, useEffect, Suspense } from 'react'

const Router = ({ lazyFallback, children }) => {
  const [path, setPath] = useState(window.location.pathname)
  
  const handleRouteChange = event => {
    setPath(window.location.pathname)
  }

  useEffect(() => { // handles browser navigation: back/forward
    window.addEventListener('popstate', handleRouteChange)
    return () => {
      window.removeEventListener('popstate', handleRouteChange)
    }
  }, [])
  
  useEffect(() => { // handles programmatic navigation
    window.addEventListener('routechange', handleRouteChange)
    return () => {
      window.removeEventListener('routechange', handleRouteChange)
    }
  }, [])
  
  return (
    <Suspense fallback={lazyFallback && <lazyFallback />}>
      {children}
    </Suspense>
  )
}

export default Router
