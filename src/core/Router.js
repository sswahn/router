import Provider from './Provider.js'
import Handler from './Handler.js'

export default function Router({ lazyFallback, children }) {
  return (
    <Provider>
      <Handler routes={routes} notFound={notFound} lazyFallback={lazyFallback} />
      {children}
    </Provider>
  )
}
