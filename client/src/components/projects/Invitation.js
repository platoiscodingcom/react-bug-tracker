import React, { useState, useEffect } from 'react'
import { Modal, Form, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
//import axios from 'axios'
import { PROJECTS_DETAILS } from './../../Constants'
import { sendInvitation } from './../../actions/projectActions'

const Invitation = ({
  sendInvitation,
  errors,
  history,
  match,
  auth: { user },
  setShowInvitation,
  showInvitation
}) => {
  const [invitation, setInvitation] = useState({
    project: match.params._id,
    invitor: user.name,
    email: '',
    description: 'Hi, here is ' + user.name + ' click on the link to join my project.'
  })

  const handleInputChange = (event, { name, value }) => {
    setInvitation(previousValue => ({ ...previousValue, [name]: value }))
  }

  const resetForm = () => {
    setInvitation({
      project: match.params._id,
      invitor: user.name,
      email: '',
      description: 'Hi, here is ' + user.name + ' click on the link to join my project.'
    })
    setShowInvitation(false)
  }

  const [submitting, setSubmitting] = useState(false)
  const handleFormSubmission = () => {
    sendInvitation(invitation)
    setSubmitting(true)
  }

  const cancel = () => {
    resetForm()
  }

  useEffect(() => {
    if (!Object.keys(errors).length && submitting) {
      resetForm()
      history.push(PROJECTS_DETAILS + '/' + match.params._id)
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors])

  return (
      <Modal open={showInvitation} centered>
        <Modal.Header>Send Invitation </Modal.Header>
        <Modal.Content>
          <Form widths='equal'>
            <Form.Group>
              <Form.Input
                label='Email'
                name='email'
                value={invitation.email}
                onChange={handleInputChange}
                error={errors.email}
                placeholder='email'
              />
            </Form.Group>
            <Form.Group>
              <Form.TextArea
                label='Description'
                name='description'
                value={invitation.description}
                onChange={handleInputChange}
                rows='4'
                error={errors.description}
              />
            </Form.Group>
          </Form>


        </Modal.Content>

        <Modal.Actions>
          <Button color='black' onClick={() => cancel()}>
            Cancel
          </Button>
          <Button color='green' content='Send' onClick={handleFormSubmission} />
        </Modal.Actions>
      </Modal>
  )
}

Invitation.propTypes = {
  sendInvitation: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
})

export default withRouter(
  connect(mapStateToProps, { sendInvitation })(Invitation)
)
