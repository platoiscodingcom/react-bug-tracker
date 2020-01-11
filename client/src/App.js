import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import Home from './components/Home'
import Navbar from './components/Navbar'
import NoMatch from './components/NoMatch'
import Projects from './components/projects/pages'
import Tasks from './components/tasks/pages'
import Categories from './components/categories/index'
import './App.css'
import { Provider } from 'react-redux'
import store from './store'
import jwt_decode from 'jwt-decode'
import setAuthToken from './setAuthToken'
import { setCurrentUser, logoutUser } from './actions/authentication'

import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Confirmation from './components/auth/Confirmation'
import Dashboard from './components/dashboard/'
import PrivateRoute from './privateRoutes'

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken)
  const decoded = jwt_decode(localStorage.jwtToken)
  store.dispatch(setCurrentUser(decoded))

  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser())
    window.location.href = '/login'
  }
}

function App () {
  return (
    <Provider store={store}>
      <Router>
      <Navbar />
        <Switch>
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route path='/confirmation/:token' component={Confirmation} />
          <Route path='/' exact component={Home} />

          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <PrivateRoute exact path='/projects' component={Projects} />
          <PrivateRoute exact path='/tasks' component={Tasks} />
          <PrivateRoute exact path='/categories' component={Categories} />
          
          <Route component={NoMatch} />
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
