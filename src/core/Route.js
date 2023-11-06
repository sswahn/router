const Route = ({ path, component: Component }) => {
  const isMatchingRoute = path ? window.location.pathname === path : true
  return isMatchingRoute && <Component /> 
}
export default Route
