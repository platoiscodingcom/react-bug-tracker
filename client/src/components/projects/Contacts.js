import React, { useState, useEffect } from 'react'
import { Card, Image, Grid, Button, Modal } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

const Contacts = ({showContacts, setShowContacts}) => {


  const cancel = () => {
    setShowContacts(false)
  }
  return (
    <Modal open={showContacts} centered>
        <Modal.Header>Your Contacts</Modal.Header>
        <Modal.Content>
        <Grid>
          <Grid.Column mobile={16} tablet={8} computer={4}>
            <Card>
              <Card.Content>
                <Image
                  floated='right'
                  size='mini'
                  src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                />
                <Card.Header>Steve Sanders</Card.Header>
                <Card.Meta>Friends of Elliot</Card.Meta>
              </Card.Content>
              <Card.Content extra>
                <div className='ui two buttons'>
                  <Button basic color='green'>
                    Send Invitation
                  </Button>
                </div>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
        </Modal.Content>

        <Modal.Actions>
          <Button color='black' onClick={() => cancel()}>
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
  )
}

Contacts.propTypes = {
  /*
  project: PropTypes.object.isRequired,
  activity: PropTypes.object.isRequired,
  getActivityByProject: PropTypes.func.isRequired*/
}

const mapStateToProps = state => ({
  //activity: state.activity,
})

export default withRouter(connect(mapStateToProps, {})(Contacts))
