import React, { useState, useEffect } from 'react'
import { Modal, Form, Button } from 'semantic-ui-react'
import {
  statusOptions,
  priorityOptions,
  typeOptions
} from '../helper/MultipleSelect'
import { OPEN, FEATURE, LOW } from '../Constants'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createTask } from './../../actions/taskActions'
import { PROJECTS_DETAILS } from './../Constants'
import { withRouter } from 'react-router'

const NewTask = ({
  createTask,
  errors,
  setShowNewTask,
  showNewTask,
  match,
  history
}) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    project: match.params._id,
    status: OPEN,
    priority: LOW,
    type: FEATURE
  })

  const handleInputChange = (event, { name, value }) => {
    setTask(previousValue => ({ ...previousValue, [name]: value }))
  }

  const cancel = () => {
    resetForm()
  }

  const resetForm = () => {
    setTask({
      title: '',
      project: '',
      description: '',
      status: OPEN,
      priority: LOW,
      type: FEATURE
    })
    setShowNewTask(false)
  }

  const [submitting, setSubmitting] = useState(false)
  const handleFormSubmission = () => {
    createTask(task)
    setSubmitting(true)
  }

  useEffect(() => {
    if (!Object.keys(errors).length && submitting) {
      resetForm()
      history.push(PROJECTS_DETAILS + '/' + match.params._id)
    }
  }, [errors])

  return (
    <div>
      <Modal open={showNewTask} centered>
        <Modal.Header>Upload File </Modal.Header>
        <Modal.Content>
          <Form widths='equal'>
            <Form.Group>
              <Form.Input
                label='Title'
                name='title'
                value={task.title}
                onChange={handleInputChange}
                error={errors.title}
              />
            </Form.Group>
            <Form.Group>
              <Form.Select
                label='Priority'
                name='priority'
                options={priorityOptions}
                value={task.priority}
                onChange={handleInputChange}
                error={errors.priority}
              />
              <Form.Select
                label='Status'
                name='status'
                options={statusOptions}
                onChange={handleInputChange}
                value={task.status}
                error={errors.status}
              />
              <Form.Select
                label='Type'
                name='type'
                options={typeOptions}
                value={task.type}
                onChange={handleInputChange}
                error={errors.type}
              />
            </Form.Group>
            <Form.Group>
              <Form.TextArea
                label='Description'
                name='description'
                value={task.description}
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
          <Button color='green' content='Save' onClick={handleFormSubmission} />
        </Modal.Actions>
      </Modal>
    </div>
  )
}

NewTask.propTypes = {
  createTask: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors
})

export default withRouter(connect(mapStateToProps, { createTask })(NewTask))
