import { useState, useContext, useEffect, Suspense, lazy } from 'react'
import { Context } from './Provider'
import { api, url } from './config'
import { getRequest } from './utilities/Server'
import Loader from './components/loading/Loader'
//const PostList = lazy(() => import('./components/list/PostList'))
//const PostListItem = lazy(() => import('./components/list/PostListItem'))
//const Profile = lazy(() => import('./features/Profile/Profile'))
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage/PrivacyPolicyPage'))
const CookieUsePage = lazy(() => import('./pages/CookieUsePage/CookieUsePage'))
const TermsAndConditionsPage = lazy(() => import('./pages/TermsAndConditionsPage/TermsAndConditionsPage'))
const NotFoundComponent = () => <div></div>//<div>404 - Not Found</div>;

const routeConfig = [
  //{ path: url.home, component: PostList },
  { path: url.privacy, component: PrivacyPolicyPage },
  { path: url.cookie, component: CookieUsePage },
  { path: url.terms, component: TermsAndConditionsPage },
  //{ path: '/:country/:city/:id', component: PostListItem },
  //{ path: '/profile/:username', component: Profile }
]

const RouteCache = new Map()

export default function Router() {
  const [route, setRoute] = useState(window.location.pathname || '/')
  const [context, dispatch] = useContext(Context)
  

  const matchRoute = path => {
    if (RouteCache.has(path)) {
      return RouteCache.get(path)
    }
    const matchedRoute = routeConfig.find(({ path: routePath }) => {
      const pathSegments = path.split('/').filter(Boolean)
      const routeSegments = routePath.split('/').filter(Boolean)
      return (
        pathSegments.length === routeSegments.length &&
        routeSegments.every((segment, index) => segment.startsWith(':') || segment === pathSegments[index])
      )
    })
    const component = matchedRoute ? matchedRoute.component : null
    RouteCache.set(path, component)
    return component
  }

  const renderComponent = () => {
    const MatchedComponent = matchRoute(route)
    return MatchedComponent ? <MatchedComponent /> : <NotFoundComponent />
  }
  
  const handleRouteChange = () => {
    dispatch({ type: 'router', payload: window.location.pathname })
  }
  
  useEffect(() => {
    // handles browser navigation: back/forward buttons
    window.addEventListener('popstate', handleRouteChange)
    return () => {
      window.removeEventListener('popstate', handleRouteChange)
    }
  }, [])
  
  useEffect(() => {
    if (context.router === window.location.pathname) {
      setRoute(context.router)
    }
  }, [context.router])
  
  return (
    <Suspense fallback={<div className="center"><Loader /></div>}>
      {renderComponent()}
    </Suspense>
  )
}
