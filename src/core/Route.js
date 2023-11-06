const Route = ({ path, component: Component }) => {
  
  console.log('Route path: ', path)
  console.log('Route pathname: ', window.location.pathname)
  
  const isMatchingRoute = path ? window.location.pathname === path : true
  return isMatchingRoute && <Component /> 
}
export default Route
