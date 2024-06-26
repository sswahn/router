import { useState, useEffect, Children } from 'react'

const Router = ({ children }) => {
  const [path, setPath] = useState(window.location.pathname)

  const matchPath = route => {
    const regex = new RegExp(`^${route.replace(/{[\w-]+}/g, '([^/]+)')}$`)
    return regex.test(window.location.pathname)
  }

  const route = Children.toArray(children).find(child => {
    return !child.props.path || path === child.props.path || matchPath(child.props.path)
  })
  
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
    <>
      {route}
    </>
  )
}

export default Router
