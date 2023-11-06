import { useContext, useEffect, Suspense } from 'react'
import { RouterContext } from './Router.js'

const Handler = ({ lazyFallback, children }) => {
  const { context, dispatch } = useContext(RouterContext) // cant use this here because Router is not inside Provider

  const handleRouteChange = event => {
    dispatch({ type: 'router', payload: window.location.pathname })
  }

  useEffect(() => { // handles browser navigation: back/forward
    window.addEventListener('popstate', handleRouteChange)
    return () => {
      window.removeEventListener('popstate', handleRouteChange)
    }
  }, [])
  
  useEffect(() => { // handles programatic navigation: navigateTo
    
  }, [context.router])
  
  return (
    <Suspense fallback={lazyFallback && <lazyFallback />}>
      {children}
    </Suspense>
  )
}

export default Handler
