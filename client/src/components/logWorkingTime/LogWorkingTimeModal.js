import React, { useEffect, useState } from 'react'
import { Button, Header, Image, Modal, Form } from 'semantic-ui-react'
import { TASKS_DETAILS } from '../../Constants'
import { createWorkingTimeLog } from '../../actions/workingTimeActions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

const LogWorkingTimeModal = ({
  setOpenLogTimeModal,
  openLogTimeModal,
  errors,
  history,
  match,
  type
}) => {
  const [workingTime, setWorkingTime] = useState({
    description: '',
    minutes: ''
  })

  const handleInputChange = (event, { name, value }) => {
    setWorkingTime(previousValue => ({ ...previousValue, [name]: value }))
  }

  const cancel = () => {
    resetForm()
  }

  const resetForm = () => {
    setWorkingTime({
      description: '',
      minutes: ''
    })
    setOpenLogTimeModal(!openLogTimeModal)
  }

  const [submitting, setSubmitting] = useState(false)
  const handleFormSubmission = () => {
    createWorkingTimeLog(workingTime, type)
    setSubmitting(true)
  }

  useEffect(() => {
    if (!Object.keys(errors).length && submitting) {
      resetForm()
      history.push(TASKS_DETAILS + '/' + match.params._id)
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors])

  return (
    <Modal open={openLogTimeModal} centered>
      <Modal.Header>Log Working Time</Modal.Header>

      <Modal.Content>
        <Form widths='equal'>
          <Form.Group>
            <Form.Input
              label='Time in Minutes'
              name='minutes'
              value={workingTime.minutes}
              onChange={handleInputChange}
              error={errors.minutes}
            />
          </Form.Group>
          <Form.Group>
            <Form.TextArea
              label='Description'
              name='description'
              value={workingTime.description}
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
        <Button
          content='Save'
          labelPosition='right'
          icon='checkmark'
          onClick={handleFormSubmission}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

LogWorkingTimeModal.propTypes = {
  createWorkingTimeLog: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  task: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth,
  task: state.task
})

export default withRouter(connect(mapStateToProps, { createWorkingTimeLog })(LogWorkingTimeModal))
