import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Header, Container } from 'semantic-ui-react'

import Create from './Create'
import List from './List'
import Update from './Update'

const Tasks = ({ match }) => {
  return (
    <>
      <Header as='h1' textAlign='center'>
        Tasks
      </Header>
      <Container>
        <Switch>
          <Route exact path={match.path} component={List} />
          <Route path={`${match.path}/create`} component={Create} />
          <Route path={`${match.path}/:_id`} component={Update} />
        </Switch>
      </Container>
    </>
  )
}

export default Tasks;
