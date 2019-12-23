import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import Home from './pages/Home'
import Navbar from './components/Navbar'
import NoMatch from './pages/NoMatch'
import Projects from './pages/projects'
import Tasks from './pages/tasks'
import Categories from './pages/categories'
import './App.css'
import { Provider } from 'react-redux'
import store from './store'
import jwt_decode from 'jwt-decode'
import setAuthToken from './setAuthToken'
import { setCurrentUser, logoutUser } from './actions/authentication'

import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Confirmation from './components/auth/Confirmation'

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
      {/* 
        <Segment color={'green'} inverted>
          <Menu as='nav' color={'green'} inverted secondary>
            <Menu.Item as={NavLink} to='/' exact name='home' />
            <Menu.Item as={NavLink} to='/projects' exact name='projects' />
            <Menu.Item as={NavLink} to='/tasks' exact name='tasks' />
            <Menu.Item as={NavLink} to='/categories' exact name='categories' />
          </Menu>
        </Segment>*/}
        <Switch>
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route path='/confirmation/:token' component={Confirmation} />
          <Route path='/' exact component={Home} />
          <Route path='/projects' component={Projects} />
          <Route path='/tasks' component={Tasks} />
          <Route path='/categories' component={Categories} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
