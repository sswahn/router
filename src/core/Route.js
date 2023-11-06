const Route = ({ path, component }) => {
  const isMatchingRoute = path ? window.location.pathname === path : true
  return isMatchingRoute && <component /> 
}
export default Route
