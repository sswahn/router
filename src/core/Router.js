import { useState, useEffect, isValidElement, Suspense } from 'react'

const Router = ({ lazyFallback, children }) => {
  const [path, setPath] = useState(window.location.pathname)

  const route = React.Children.map(children, (child) => {
    if (isValidElement(child) && path === child.props.path) {
      const Component = child.props.component
      return <Component />
    }
    return null
  })
  
  const handlePopState = event => {
    setPath(window.location.pathname)
  }

  const handleRouteChange = event => {
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
      {route}
    </Suspense>
  )
}

export default Router
