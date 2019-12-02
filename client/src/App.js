import React from 'react';
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch
} from 'react-router-dom'

import Home from './pages/Home'
import Projects from './pages/projects'
import Tasks from './pages/tasks'
import Categories from './pages/categories'
import './App.css';
import { Menu, Segment } from 'semantic-ui-react'


function App() {
  return (
    <div>
      <Router>
        <Segment >
          <Menu as='nav'  secondary>
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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
