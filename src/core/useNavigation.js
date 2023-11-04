import { useContext } from 'react'
import { Context } from './Provider.js'

export function useNavigation() {
  const [context, dispatch] = useContext(Context)
  
  const navigateTo = (path) => {
    history.pushState(null, '', path)
    dispatch({ type: 'router', payload: path })
  }
  return navigateTo
}
