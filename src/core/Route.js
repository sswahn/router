const Route = ({ component: Component }) => {
  return typeof Component === 'function' ? Component() : Component
}
export default Route
