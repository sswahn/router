# Router · [![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/sswahn/router/blob/main/LICENSE) ![npm version](https://img.shields.io/npm/v/@sswahn/router) [![NPM Package Size](https://package-size.com/badge/@sswahn/router)](https://package-size.com/result/@sswahn/router) ![Weekly Downloads](https://img.shields.io/npm/dw/@sswahn/router) ![GitHub stars](https://img.shields.io/github/stars/sswahn/router?style=social)

A lightweight and flexible routing solution. Router simplifies the process of implementing client-side routing in React applications, making it easier to manage different views and navigate between them while maintaining a component-based approach.

## Features

- **Component-Based Routing**: The library is designed to work with React's component-based architecture, allowing you to define routes using individual components.
- **"Not Found" Handling**: The library provides a built-in mechanism to handle "Not Found" scenarios when no matching route is found. This is typically achieved by using a component without a path prop.
- **Programmatic Navigation**: It supports programmatic navigation through a navigateTo function, enabling you to navigate to specific routes in your application.
- **Dynamic Component Resolution**: Use function-based components to dynamically resolve which component to render based on conditions specific to each route.
- **Asynchronous Loading**: The library supports lazy loading of components through React's Suspense mechanism, allowing for a smoother user experience.
- **Simple and Efficient**: The routing logic is implemented with simplicity and efficiency in mind, allowing for a clean and straightforward routing solution.
- **Customization**: The library is flexible and can be customized to fit the specific needs of your application.  

<!-- TODO: - **Component Injection**: Inject props or other components into the rendered component based on route-specific conditions. This can be helpful for customizing the behavior and appearance of the component. -->

## Installation  
```bash
npm install @sswahn/router
```  

## Usage
Import the router component.  
```javascript
import { Router, Route } from '@sswahn/router'
```  

Define your routes' paths and their associated components.  
```javascript
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import NotFound from './components/NotFound'

<Router>
  <Route path="/" component={Home} />
  <Route path="/about" component={About} />
  <Route path="/contact" component={Contact} />
  <Route component={NotFound}
</Router>
```  

To lazy load a component provide a `lazyFallback` component.  
```javascript
<Router lazyFallback={CustomLoadingSpinner}>
  <Route path="/" component={Home} />
  ...
</Router>
```  

Navigate to a route's path with `navigateTo`.  
```javascript
import { navigateTo } from '@sswahn/router'
...
const handleOnClick = event => {
  navigateTo('/about')
}
```

Use a function to return a component.  
```javascript
<Route path="/dashboard" component={() => {
  if (userIsAuthenticated) {
    return AuthenticatedDashboard
  } else {
    return PublicDashboard
  }
}} />
```  

## Peer Dependencies

Router requires React as a peer dependency. You should have React installed in your project with a version compatible with this library.

[React](https://reactjs.org/): ^18.2.0


## License
Router is [MIT Licensed](https://github.com/sswahn/router/blob/main/LICENSE)
