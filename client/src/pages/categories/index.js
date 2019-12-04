import React from 'react';
import { Route, Switch } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import Create from './Create'
import List from './List'
import Update from './Update'


const Categories = ({ match }) => {
  return (
    <div>
      <Container style={{ marginBottom: "50px"}}>
        <Switch>
          <Route exact path={match.path} component={List} />
          <Route path={`${match.path}/create`} component={Create} />
          <Route path={`${match.path}/:_id`} component={Update} />
        </Switch>
      </Container>
    </div>
  )
}

export default Categories;
