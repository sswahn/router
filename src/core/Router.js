import { useContext, useEffect, Suspense } from 'react'
import { RouterContext } from './Provider.js'
import Provider from './Provider.js'

const Router = ({ lazyFallback, children }) => {
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
    <Provider>
      <Suspense fallback={lazyFallback && <lazyFallback />}>
        {children}
      </Suspense>
    </Provider>
  )
}

export default Router
