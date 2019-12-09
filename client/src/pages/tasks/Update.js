import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Card, Button, Form } from 'semantic-ui-react'
import { validateTask } from '../../validation/validateTask'
import { errorsEmpty } from '../../validation/validationFunctions'
import {
  statusOptions,
  priorityOptions,
  typeOptions
} from '../../components/helper/MultipleSelect'
import UpdateLoader from '../../components/loader/UpdateLoader'
import {
  TASKS_PATH,
  PROJECTS_PATH,
  TASKS_HOME
} from '../../components/Constants'

const Update = ({ match }) => {
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [projects, setProjects] = useState([])
  const [redirect, setRedirect] = useState(false)
  const [task, setTask] = useState({
    title: '',
    project: '',
    description: '',
    status: '',
    priority: '',
    type: ''
  })

  useEffect(
    () => {
      axios
        .get(`${TASKS_PATH}/${match.params._id}`)
        .then(response => {
          setTask(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    [match]
  )

  useEffect(
    () => {
      if (errorsEmpty(Object.values(errors)) && isSubmitting) {
        axios
          .put(`${TASKS_PATH}/${match.params._id}`, task)
          .then(() => {
            console.log('do redirect')
            setRedirect(true)
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    [errors, isSubmitting, match.params._id, task]
  )

  useEffect(
    () => {
      axios
        .get(PROJECTS_PATH)
        .then(response => {
          setProjects(
            response.data.map(project => ({
              text: `${project.name}`,
              value: project._id
            }))
          )
        })
        .catch(error => {
          console.log(error)
        })
    },
    [match]
  )

  const handleInputChange = (event, { name, value }) => {
    setTask(prevValue => ({ ...prevValue, [name]: value }))
  }

  const handleFormSubmission = () => {
    setErrors(validateTask(task))
    setIsSubmitting(true)
  }

  const handleFormCancellation = () => {
    setRedirect(true)
  }

  if (task == null || task === '') {
    return <UpdateLoader />
  } else {
    return (
      <>
        {redirect ? (
          <Redirect to={TASKS_HOME} push />
        ) : (
          <>
            <Card fluid>
              <Card.Content header={task.title} />
              <Card.Content>
                <Form widths='equal'>
                  <Form.Group>
                    <Form.Input
                      label='title'
                      name='title'
                      value={task.title}
                      onChange={handleInputChange}
                      error={errors.title}
                    />
                    <Form.Select
                      label='Project'
                      name='project'
                      options={projects}
                      value={task.project._id}
                      onChange={handleInputChange}
                      error={errors.project}
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
                      value={task.status}
                      onChange={handleInputChange}
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
                      rows='12'
                      error={errors.description}
                    />
                  </Form.Group>
                </Form>
              </Card.Content>
              <Card.Content extra>
                <Button
                  floated='right'
                  color='black'
                  content='Cancel'
                  onClick={handleFormCancellation}
                />
                <Button
                  floated='right'
                  color='green'
                  content='Save'
                  onClick={handleFormSubmission}
                />
              </Card.Content>
            </Card>
          </>
        )}
      </>
    )
  }
}

export default Update
