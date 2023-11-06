import { useContext, useEffect, Suspense } from 'react'
import { RouterContext } from './Provider'
import Provider from './Provider.js'

export default function Router({ lazyFallback, children }) {
  const { context, dispatch } = useContext(RouterContext)

  const handleRouteChange = event => {
    dispatch({ type: 'router', payload: window.location.pathname })
  }

  useEffect(() => { // handles browser navigation: back/forward buttons
    window.addEventListener('popstate', handleRouteChange)
    return () => {
      window.removeEventListener('popstate', handleRouteChange)
    }
  }, [])
  
  useEffect(() => { // handles programatic navigation: navigateTo
    // just need to rerender component on context.router change
  }, [context.router])
  
  return (
    <Provider>
      <Suspense fallback={lazyFallback && <lazyFallback />}>
        {children}
      </Suspense>
    </Provider>
  )
}
