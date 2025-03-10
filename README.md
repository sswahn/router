# Router · [![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/sswahn/router/blob/main/LICENSE) ![npm version](https://img.shields.io/npm/v/@sswahn/router) ![Weekly Downloads](https://img.shields.io/npm/dw/@sswahn/router) ![GitHub stars](https://img.shields.io/github/stars/sswahn/router?style=social)

A lightweight and flexible routing solution. Router simplifies the process of implementing client-side routing in React applications, making it easier to manage different views and navigate between them while maintaining a component-based approach.

## Features

- **Component-Based Routing**: The library is designed to work with React's component-based architecture, allowing you to define routes using individual components.
- **Programmatic Navigation**: It supports programmatic navigation through a `navigateTo` function, enabling you to navigate to specific routes in your application.
- **Dynamic Component Resolution**: Use function-based components to dynamically resolve which component to render based on conditions specific to each route.
- **Dynamic Parameters**: Define dynamic parameters in your route paths to intelligently match and capture values for these parameters.
- **Base Path Handling**: Supports applications deployed under a subpath using the `basePath` prop in the Router component to ensure correct routing.
- **"Not Found" Handling**: The library provides a built-in mechanism to handle "Not Found" scenarios when no matching route is found. This is achieved by using a component without a path prop.
- **Simple and Efficient**: The routing logic is implemented with simplicity and efficiency in mind, allowing for a clean and straightforward routing solution.
- **Customization**: The library is flexible and can be customized to fit the specific needs of your application.  


## Installation  
```bash
npm install @sswahn/router
```  

## Usage
Import the router component.  
```javascript
import { Router, Route } from '@sswahn/router'
```  

### Routing
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

### Dynamic Parameters
The `Route` component supports dynamic parameters in route paths.
```jsx
<Route path="/profile/{username}" component={UserProfile} />
```

### Programmatic Navigation
Navigate to a route's path with `navigateTo`.  
```javascript
import { navigateTo } from '@sswahn/router'
...
const handleOnClick = event => {
  navigateTo('/about')
}
```

### Dynamic Component Resolution
Use a function to return a component.  
```javascript
<Route path="/dashboard" component={() => {
  if (userIsAuthenticated) {
    return <AuthenticatedDashboard />
  } else {
    return <PublicDashboard />
  }
}} />
```

### Base Path Handling
If your application is hosted under a subdirectory like `domain.com/app/` use the `basePath` prop
```javascript
<Router basePath="/app">
  <Route path="/" component={Home} />
  <Route path="/about" component={About} />
  <Route path="/contact" component={Contact} />
  <Route component={NotFound} />
</Router>
```  


## Peer Dependencies
Router requires React as a peer dependency. You should have React installed in your project with a version compatible with this library.
- [React](https://reactjs.org/): ^18.2.0


## License
Router is [MIT Licensed](https://github.com/sswahn/router/blob/main/LICENSE)
