import Provider from './Provider.js'
import Handler from './Handler.js'

export default function Router({ routes, notFound, lazyFallback, children }) {
  return (
    <Provider>
      <Handler routes={routes} notFound={notFound} lazyFallback={lazyFallback} />
      {children}
    </Provider>
  )
}
