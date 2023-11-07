const Route = ({ component: Component }) => {

  console.log('Component: ', Component)

  console.log('typeof Component: ', typeof Component)

  console.log('typeof Component === "function": ', typeof Component === 'function')
  
  return typeof Component === 'function' ? Component() : Component
}
export default Route
