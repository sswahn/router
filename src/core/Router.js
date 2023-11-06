import { createContext, useReducer } from 'react'
import Handler from './Handler.js'

export const RouterContext = createContext([])

const Router = ({ lazyFallback, children }) => {
  const data = {
    router: window.location.pathname || '/'
  }
  function reducer(state, action) {
    switch(action.type) {
      case 'router':
        return { ...state, router: action.payload }
      default:
        return state
    }
  }
  const [context, dispatch] = useReducer(reducer, data)
  return (
    <RouterContext.Provider value={{context, dispatch}}>
      <Handler lazyFallback={lazyFallback}>{children}</Handler>
    </RouterContext.Provider>
  )
}

export default Router
