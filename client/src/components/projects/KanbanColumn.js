import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Card, Button, Grid, Header } from 'semantic-ui-react'
import { TypeIcon } from '../tasks/TaskIcons'
import StatusColor from '../status/StatusColor'
import uuid from 'uuid'
import { TASKS_DETAILS } from '../../Constants'

const KanbanColumn = ({ sortedTasks, status }) => {
  return (
    <div>
      <Header size='medium'>
        <StatusColor key={uuid.v4()} status={status} />
      </Header>
      <Grid.Column style={{ margin: '0px 2px 2px 2px' }}>
      {sortedTasks.map(task => {
        const { _id, title, priority, type, description } = task
        const shortTitle = title.substring(0, 35)
        const shortDesc = description.substring(0, 100)

        return (
          
            <Card key={_id}>
              <Card.Content>
                <Card.Header>
                  <TypeIcon key={uuid.v4()} type={type} /> {shortTitle}
                </Card.Header>
                <Card.Meta>
                  <span className='date'>Assigned To: Max Mustermann</span>
                </Card.Meta>
                <Card.Description>
                  <span className='date'>{shortDesc}</span>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Button
                  circular
                  compact
                  size='mini'
                  color='black'
                  as={Link}
                  to={`${TASKS_DETAILS}/${_id}`}
                >
                  <i className='fas fa-eye' />{' '}
                </Button>
                Priority: {priority}
              </Card.Content>
            </Card>
          
        )
        
      })}</Grid.Column>
    </div>
  )
}

KanbanColumn.propTypes = {}


export default withRouter(connect(null, {})(KanbanColumn))
