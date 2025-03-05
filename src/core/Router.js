import { useState, useEffect, Children } from 'react'

const Router = ({ basePath = '', children }) => {
  
  const getRelativePath = () => {
    return window.location.pathname.startsWith(basePath)
      ? window.location.pathname.replace(basePath, '') || '/'
      : window.location.pathname;
  }

  const [path, setPath] = useState(getRelativePath())
  
  const matchPath = route => {
    const regex = new RegExp(`^${route.replace(/{[\w-]+}/g, '([^/]+)')}$`)
    return regex.test(path)
  }

  const route = Children.toArray(children).find(child => {
    return !child.props.path || path === child.props.path || matchPath(child.props.path)
  })
  
  const handlePopState = event => {
    setPath(getRelativePath())
  }

  const handleRouteChange = event => {
    const newPath = event.detail.path.startsWith(basePath)
      ? event.detail.path.replace(basePath, '') || '/'
      : event.detail.path
    setPath(newPath)
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
