import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react'

import Create from './Create';
import List from './List';
import Update from './Update';
import Details from './Details';

const Projects = ({ match }) => {
  return (
    <>
      <Container style={{ marginBottom: "50px"}} >
        <Switch>
          <Route exact path={match.path} component={List} />
          <Route path={`${match.path}/create`} component={Create} />
          <Route exact path={`${match.path}/details/:_id`} component={Details} />
          <Route path={`${match.path}/:_id`} component={Update} />
        </Switch>
      </Container>
    </>
  )
}

export default Projects;