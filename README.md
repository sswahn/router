# Router

A lightweight and flexible router.

## Features

- Custom route configuration
- Custom 404 (Not Found) component
- Lazy loading components
- Route caching
- Programmatic navigation
<!-- - Route guards (before and after route change) -->

## Installation  
```bash
npm install @sswahn/router
```  

## Usage
Import the router component.  
```javascript
import { Router } from '@sswahn/router'
```  

Define your routes' paths and their associated components.  
```javascript
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/contact', component: Contact },
]
```

Create the `Router` component using your routes array.  
```javascript
<Router routes={routes}>
  <App />
</Router>
```

Define a custom 404 component.  
```javascript
const CustomNotFound = () => <div>Custom 404 - Not Found</div>
```

Add your custom 404 component the `Router`.  
```javascript
<Router routes={routes} notFound={CustomNotFound}>
  <App />
</Router>
```  

To lazy load a component provide a `lazyFallback` component.  
```javascript
<Router
  routes={routes}
  notFound={CustomNotFound}
  lazyFallback={CustomFallbackComponent}>
  <App />
</Router>
```  

Navigate to a route's path with `navigateTo`.  
```javascript
import { useContext } from 'react'
import { RouterContext } from '@sswahn/router'

...

const { navigateTo } = useContext(RouterContext)

const handleOnClick = event => {
  navigateTo('/about')
}
```


<!--
## Route Guards
You can define route guards to run code before and after route changes.  
```javascript
const beforeRouteChange = path => {
  console.log(`Before navigating to ${path}`)
}

const afterRouteChange = path => {
  console.log(`After navigating to ${path}`)
}

<Router
  routes={routes}
  notFound={CustomNotFound}
  lazyFallback={CustomFallbackComponent}
  beforeRouteChange={beforeRouteChange}
  afterRouteChange={afterRouteChange}>
  <App />
</Router>
```
-->
## License
Router is [MIT Licensed](https://github.com/sswahn/router/blob/main/LICENSE)
