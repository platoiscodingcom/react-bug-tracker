import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import Create from './Create'
import List from './List'
import Update from './Update'
import Details from './Details'
import NoMatch from '../NoMatch'
import {
  TASKS_HOME,
  TASKS_DETAILS,
  TASKS_CREATE
} from '../../components/Constants'

const Tasks = ({ match }) => {
  return (
    <>
      <Container style={{ marginBottom: '50px' }}>
        <Switch>
          <Route exact path={TASKS_HOME} component={List} />
          <Route exact path={TASKS_CREATE} component={Create} />
          <Route
            exact
            path={`${TASKS_DETAILS}/:_id`}
            component={Details}
          />
          <Route exact path={`${TASKS_HOME}/:_id`} component={Update} />
          <Route component={NoMatch} />
        </Switch>
      </Container>
    </>
  )
}

export default Tasks
