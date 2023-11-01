# Router

A lightweight and flexible router.

## Features

- Custom route configuration
- Custom 404 (Not Found) component
- Optional route guards (before and after route change)
- No external dependencies

## Installation  
```bash
npm install @sswahn/router
```  

## Usage
Import the router component.  
```javascript
import Router from '@sswahn/router'
```  

Define your route components and custom 404 component.  
```javascript
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/contact', component: Contact },
]

const CustomNotFound = () => <div>Custom 404 - Not Found</div>
```

Create the `Router` component in your application.  
```javascript
<Router
  routes={routes}
  notFoundComponent={CustomNotFound}
/>
```

## Route Guards
You can define route guards to run code before and after route changes.  
```javascript
const beforeRouteChange = path => {
  console.log(`Before navigating to ${path}`);
};

const afterRouteChange = path => {
  console.log(`After navigating to ${path}`);
};

<Router
  routes={routes}
  notFoundComponent={CustomNotFound}
  beforeRouteChange={beforeRouteChange}
  afterRouteChange={afterRouteChange}
/>
```

## License
Server is [MIT Licensed](https://github.com/sswahn/router/blob/main/LICENSE)
