import React from 'react';
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch
} from 'react-router-dom'
import { Container, Menu, Segment } from 'semantic-ui-react'

import Home from './pages/Home'
import Projects from './pages/projects'
import Tasks from './pages/tasks'


function App() {
  return (
    <Container>
      <Router>
        <Segment inverted>
          <Menu as='nav' inverted pointing secondary>
            <Menu.Item as={NavLink} to='/' exact name='home' />
            <Menu.Item as={NavLink} to='/projects' name='projects' />
            <Menu.Item as={NavLink} to='/tasks' name='tasks' />
          </Menu>
        </Segment>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/projects' component={Projects} />
          <Route path='/tasks' component={Tasks} />
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
