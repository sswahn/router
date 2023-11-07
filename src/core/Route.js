const Route = ({ component: Component }) => {
  if (typeof Component === 'function') {
    const Result = Component()
    return <Result />
  } else {
    return Component
  }
}
export default Route
