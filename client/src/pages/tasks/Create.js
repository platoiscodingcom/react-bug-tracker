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
import {
  OPEN,
  FEATURE,
  LOW,
  TASKS_PATH,
  PROJECTS_PATH,
  TASKS_HOME
} from '../../components/Constants'

const Create = ({ match }) => {
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [projects, setProjects] = useState([])
  const [redirect, setRedirect] = useState(false)
  const [task, setTask] = useState({
    title: '',
    project: '',
    description: '',
    status: OPEN,
    priority: LOW,
    type: FEATURE
  })

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
    setTask(previousValue => ({ ...previousValue, [name]: value }))
  }

  const handleFormSubmission = () => {
    setErrors(validateTask(task))
    setIsSubmitting(true)
  }

  useEffect(
    () => {
      if (errorsEmpty(Object.values(errors)) && isSubmitting) {
        axios
          .post(TASKS_PATH, task)
          .then(() => {
            setRedirect(true)
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    [errors, isSubmitting, task]
  )

  const handleFormCancellation = () => {
    setRedirect(true)
  }

  return (
    <>
      {redirect ? (
        <Redirect to={TASKS_HOME} push />
      ) : (
        <Card fluid>
          <Card.Content header='New Task' />
          <Card.Content>
            <Form widths='equal'>
              <Form.Group>
                <Form.Input
                  label='Title'
                  name='title'
                  value={task.title}
                  onChange={handleInputChange}
                  error={errors.title}
                />
                <Form.Select
                  label='Project'
                  name='project'
                  options={projects}
                  value={task.project}
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
      )}
    </>
  )
}

export default Create
