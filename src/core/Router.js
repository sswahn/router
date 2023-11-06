import { useState, useEffect, Suspense } from 'react'

const Router = ({ lazyFallback, children }) => {
  const [path, setPath] = useState(window.location.pathname)
  
  const handlePopState = event => {
    setPath(window.location.pathname)
  }

  const handleRouteChange = event => {
    console.log('handleRouteChange event: ', event)
    setPath(event.detail.path)
  }

  useEffect(() => { // handles browser navigation: back/forward
    window.addEventListener('popstate', handlePopState)
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
    <Suspense fallback={lazyFallback && <lazyFallback />}>
      {children}
    </Suspense>
  )
}

export default Router
