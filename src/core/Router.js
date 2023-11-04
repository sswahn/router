import Provider from './Provider.js'
import Handler from './Handler.js'

export default function Router({ routes, notFound, lazyFallback }) {
  return (
    <Provider>
      <Handler routes={routes} notFound={notFound} lazyFallback={lazyFallback} />
    </Provider>
  )
}
