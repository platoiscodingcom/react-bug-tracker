import React, { useState } from 'react'
import { Container, Card, Form, Button } from 'semantic-ui-react'
import {
  statusOptions,
  priorityOptions,
  typeOptions
} from '../helper/MultipleSelect'

const SearchBar = ({ tasks }) => {
  const [task, setTask] = useState({
    title: '',
    status: '',
    priority: '',
    type: ''
  })

  const handleInputChange = (event, { name, value }) => {
    setTask(previousValue => ({ ...previousValue, [name]: value }))
  }

  const searchTask = searchTaskProperties => {
    let results = []
    tasks.forEach(task => {
      if(task.status === searchTaskProperties.status) {
          results.push(task)
        }
    })
  }

  return (
    <Container style={{ marginTop: '15px' }}>
      <Card fluid>
        <Card.Content>
          <Form widths='equal'>
            <Form.Group>
              <Form.Input
                label='Title'
                name='title'
                value={task.title}
                onChange={handleInputChange}
              />
              <Form.Select
                label='Priority'
                name='priority'
                options={priorityOptions}
                value={task.priority}
                onChange={handleInputChange}
              />
              <Form.Select
                label='Status'
                name='status'
                options={statusOptions}
                onChange={handleInputChange}
                value={task.status}
              />
              <Form.Select
                label='Type'
                name='type'
                options={typeOptions}
                value={task.type}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>

          <Button
            color='green'
            icon='search'
            content='Search Task'
            onClick={() => searchTask(task)}
          ></Button>
        </Card.Content>
      </Card>
    </Container>
  )
}

export default SearchBar
