import { useState, useEffect, Children, Suspense } from 'react'

const Router = ({ lazyFallback, children }) => {
  const [path, setPath] = useState(window.location.pathname)

  /*
  const route = Children.toArray(children).find(child => {
    if (!child.props.path || path === child.props.path) {
      if (typeof child.props.component === 'function') {
        const Component = child.props.component()
        return <Component />
      } else {
        const Component = child.props.component
        return <Component />
      }
    }
  }) */

  const route = Children.toArray(children).find(child => {
    return child.props.path === path
  })

  const handleLazyFallback = () => {
    if (lazyFallback) {
      const Component = lazyFallback
      return <Component />
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
