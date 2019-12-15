import React from 'react'
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch
} from 'react-router-dom'

import Home from './pages/Home'
import NoMatch from './pages/NoMatch'
import Projects from './pages/projects'
import Tasks from './pages/tasks'
import Categories from './pages/categories'
import './App.css'
import { Menu, Segment } from 'semantic-ui-react'
import {Provider} from 'react-redux'
import store from "./store";

function App () {
  return (
    <Provider store={store}>
      <Router>
        <Segment>
          <Menu as='nav' secondary>
            <Menu.Item as={NavLink} to='/' exact name='home' />
            <Menu.Item as={NavLink} to='/projects' name='projects' />
            <Menu.Item as={NavLink} to='/tasks' name='tasks' />
            <Menu.Item as={NavLink} to='/categories' name='categories' />
          </Menu>
        </Segment>
        <Switch>
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
