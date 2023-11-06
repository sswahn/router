
export const Context = createContext([])

const Provider = ({ children }) => {
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
    <Context.Provider value={{context, dispatch}}>
      {children}
    </Context.Provider>
  )
}

export default Provider
