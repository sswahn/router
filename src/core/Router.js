import { useEffect, Suspense } from 'react'
import Provider from './Provider.js'

export default function Router({ lazyFallback, children }) {

  useEffect(() => { // handles browser navigation: back/forward buttons
    window.addEventListener('popstate', handleRouteChange)
    return () => {
      window.removeEventListener('popstate', handleRouteChange)
    }
  }, [])
  
  useEffect(() => { // handles programatic navigation: navigateTo
    if (context.router === window.location.pathname) {
      setRoute(context.router)
    }
  }, [context.router])
  
  return (
    <Provider>
      <Suspense fallback={lazyFallback && <lazyFallback />}>
        {children}
      </Suspense>
    </Provider>
  )
}
