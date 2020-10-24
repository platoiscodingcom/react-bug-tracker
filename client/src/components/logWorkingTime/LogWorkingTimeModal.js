import React, { useEffect, useState } from 'react'
import { Button, Modal, Form } from 'semantic-ui-react'
import { createWorkingTimeLog } from '../../actions/workingTimeActions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import moment from 'moment'

const LogWorkingTimeModal = ({
  setOpenLogTimeModal,
  openLogTimeModal,
  errors,
  documentId,
  createWorkingTimeLog,
  auth: { user }
}) => {
  const [workingTimeLog, setWorkingTimeLog] = useState({
    description: '',
    minutes: '',
    userId: user.id,
    userName: user.name
  })

  const handleInputChange = (event, { name, value }) => {
    setWorkingTimeLog(previousValue => ({ ...previousValue, [name]: value }))
  }

  const cancel = () => {
    resetForm()
  }

  const resetForm = () => {
    setWorkingTimeLog({
      description: '',
      minutes: '',
      userId: user.id,
      userName: user.name
    })
    setOpenLogTimeModal(false)
  }

  const [submitting, setSubmitting] = useState(false)
  const handleFormSubmission = () => {
    createWorkingTimeLog(workingTimeLog, documentId)
    setSubmitting(true)
  }

  useEffect(() => {
    if (!Object.keys(errors).length && submitting) {
      resetForm()
    } 
  }, [errors, submitting])

  return (
    <Modal open={openLogTimeModal} centered>
      <Modal.Header>Log Working Time</Modal.Header>

      <Modal.Content>
        <Form widths='equal'>
          <Form.Group>
            <Form.Input
              label='Date and Time'
              name='createdAt'
              value={moment().format('MMMM Do YYYY, h:mm:ss a')}
              disabled
            />
            <Form.Input
              label='Time in Minutes'
              name='minutes'
              type='number'
              value={workingTimeLog.minutes}
              onChange={handleInputChange}
              error={errors.minutes}
            />
          </Form.Group>
          <Form.Group>
            <Form.TextArea
              label='Description'
              name='description'
              value={workingTimeLog.description}
              onChange={handleInputChange}
              rows='8'
              error={errors.description}
            />
          </Form.Group>
        </Form>
      </Modal.Content>

      <Modal.Actions>
        <Button color='black' onClick={() => cancel()}>
          Cancel
        </Button>
        <Button content='Save' onClick={handleFormSubmission} positive />
      </Modal.Actions>
    </Modal>
  )
}

LogWorkingTimeModal.propTypes = {
  createWorkingTimeLog: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  task: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth,
  task: state.task
})

export default withRouter(
  connect(mapStateToProps, { createWorkingTimeLog })(LogWorkingTimeModal)
)
