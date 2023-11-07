const Route = ({ component: Component }) => {
  if (typeof Component === 'function' && (typeof Component !== 'object' && Component.$$typeof !== Symbol.for('react.element'))) {
    const Result = Component()
    return <Result />
  } else {
    return <Component />
  }
}
export default Route
