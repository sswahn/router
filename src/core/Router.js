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
  
  useEffect(() => { // handles programatic navigation: navigateTo
    
  }, [window.location.pathname, path])
  
  return (
    <Suspense fallback={lazyFallback && <lazyFallback />}>
      {children}
    </Suspense>
  )
}

export default Router
