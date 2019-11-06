import React from 'react';
import { Route, Switch } from 'react-router-dom'
import { Header, Segment } from 'semantic-ui-react'

import Create from './Create'
import List from './List'
import Update from './Update'


const Categories = ({ match }) => {
  return (
    <div>
      <Header as='h1' textAlign='center'>
        Categories
      </Header>
      <Segment>
        <Switch>
          <Route exact path={match.path} component={List} />
          <Route path={`${match.path}/create`} component={Create} />
          <Route path={`${match.path}/:_id`} component={Update} />
        </Switch>
      </Segment>
    </div>
  )
}

export default Categories;
