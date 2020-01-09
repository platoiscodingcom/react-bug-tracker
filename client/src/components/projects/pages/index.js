import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import Create from './Create'
import List from './List'
import Update from './Update'
import Details from './Details'
import Kanban from './Kanban'
import NoMatch from '../../NoMatch'

const Projects = ({ match }) => {
  return (
      <Container style={{width: '95%', marginBottom: '70px'}}fluid>
        <Switch>
          <Route exact path={match.path} component={List} />
          <Route exact path={`${match.path}/create`} component={Create} />
          <Route exact path={`${match.path}/kanban/:_id`} component={Kanban} />
          <Route
            exact
            path={`${match.path}/details/:_id`}
            component={Details}
          />
          <Route exact path={`${match.path}/:_id`} component={Update} />
          <Route component={NoMatch} />
        </Switch>
      </Container>
  )
}

export default Projects