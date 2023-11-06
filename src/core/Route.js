const Route = ({ path, component }) => {
  const isMatchingRoute = path ? window.location.pathname === path : true
  return isMatchingRoute && <Component /> 
}
export default Route
