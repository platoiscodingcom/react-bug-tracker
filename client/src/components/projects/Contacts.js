import React, { useState, useEffect } from 'react'
import { Card, Image, Grid, Button, Modal } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import axios from 'axios'
import { GET_CONTACTS_INFO_PATH } from './../../Constants'
import uuid from 'uuid'
import {sendInvitationToContact} from './../../actions/projectActions'

const Contacts = ({
  showContacts,
  setShowContacts,
  project: { project },
  auth: { user }
}) => {
  const [contactInfo, setContactInfo] = useState([
    {
      id: '',
      avatar: 'https://react.semantic-ui.com/images/avatar/large/steve.jpg',
      name: ''
    }
  ])
  const [permittedUsers, setPermittedUsers] = useState([])

  useEffect(() => {
    loadPermittedUsers()
    loadContactInfo(user.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showContacts, project.permittedUsers])

  const cancel = () => {
    setShowContacts(false)
  }

  const loadPermittedUsers = () => {
    if (project.permittedUsers) {
      var ids = project.permittedUsers.map(user => user._id)
      setPermittedUsers(ids)
    }
  }

  const loadContactInfo = async (id) => {
    await axios.get(GET_CONTACTS_INFO_PATH + id).then(res => {
      setContactInfo(
        res.data.map(user => ({
          name: `${user.name}`,
          id: user._id,
          avatar: 'https://react.semantic-ui.com/images/avatar/large/steve.jpg'
        }))
      )
    })
  }

  const sendInvitation = id => {
    setShowContacts(false)
    sendInvitationToContact(id)
  }

  let contactInfoCards = []
  if (user.contacts && contactInfo) {
    contactInfoCards = contactInfo.map(contact => (
      <Card key={uuid.v4()}>
        <Card.Content>
          <Image floated='right' size='mini' src={contact.avatar} />
          <Card.Header>{contact.name}</Card.Header>
          <Card.Meta>Friends of Elliot</Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            {permittedUsers.includes(contact.id) ? (
              <Button disabled color='blue'>
                Permitted
              </Button>
            ) : (
              <Button
                basic
                color='green'
                onClick={() => sendInvitation(contact.id)}
              >
                Send Invitation
              </Button>
            )}
          </div>
        </Card.Content>
      </Card>
    ))
  }

  return (
    <Modal open={showContacts} centered>
      <Modal.Header>Your Contacts</Modal.Header>
      <Modal.Content>
        <Grid>
          <Grid.Column mobile={16} tablet={8} computer={8}>
            {contactInfoCards}
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
  project: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  sendInvitationToContact: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  project: state.project,
  auth: state.auth
})

export default withRouter(connect(mapStateToProps, {sendInvitationToContact})(Contacts))
