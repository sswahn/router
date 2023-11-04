import { createContext, useReducer } from 'react'

export const RouterContext = createContext([])

export default function Provider({ children }) {
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
  
  const navigateTo = path => {
    history.pushState(null, '', path)
    dispatch({ type: 'router', payload: path })
  }
  
  return (
    <RouterContext.Provider value={{context, dispatch, navigateTo}}>
      {children}
    </RouterContext.Provider>
  )
}
