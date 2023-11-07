const { isValidElement } from 'react'

const Route = ({ component: Component }) => {

  console.log('Component: ', Component)

  console.log('typeof Component: ', typeof Component)

  console.log('isValidElement(Component): ', isValidElement(Component))
  
  return isValidElement(Component) ? Component : Component()
}
export default Route
