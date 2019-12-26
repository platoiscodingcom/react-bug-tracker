import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { getProjects } from '../../actions/projectActions'
import { Card, Button, Divider, Grid, Tab, Container } from 'semantic-ui-react'
import ProjectList  from './ProjectList';

const Dashboard = ({ match, history, auth: {user}}) => {

  const panes = [
    {
      menuItem: 'My Projects',
      render: () => <Tab.Pane attached={false}><ProjectList /></Tab.Pane>,
    },
    {
      menuItem: 'Assigned Tasks',
      render: () => <Tab.Pane attached={false}>Assigned Tasks</Tab.Pane>,
    },
  ]

  return (
    <Container fluid>
    <Grid divided='vertically'>
    <Grid.Row columns={2}>
      <Grid.Column>
      <Tab menu={{ text: true }} panes={panes} />
      </Grid.Column>
      <Grid.Column>
        updates
      </Grid.Column>
    </Grid.Row>
    </Grid>
    
    </Container>
    
  )
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default withRouter(connect(mapStateToProps, {  })(Dashboard))
