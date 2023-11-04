import Provider from './Provider'
import Handler from './Handler'

export default function Router({ routes, notFound, lazyFallback }) {
  return (
    <Provider>
      <Handler routes={routes} notFound={notFound} lazyFallback={lazyFallback} />
    </Provider>
  )
}
