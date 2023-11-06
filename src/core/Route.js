const Route = ({ path, component }) => {
  return window.location.pathname === path && <component />
}
export default Route
