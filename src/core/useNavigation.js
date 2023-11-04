import { useContext } from 'react'
import { Context } from './Provider'

export function useNavigation() {
  const { dispatch } = useContext(Context)
  
  const navigateTo = (path) => {
    history.pushState(null, '', path)
    dispatch({ type: 'router', payload: path })
  }
  return navigateTo
}
