import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { Card, Button, Grid, CardGroup, Header } from 'semantic-ui-react'
import { TypeIcon } from '../../../components/tasks/TaskIcons'
import StatusColor from '../../../components/status/StatusColor'
import uuid from 'uuid'
import { TASKS_DETAILS } from '../../../components/Constants'

const KanbanColumn = ({ sortedTasks, status }) => {
  return (
    <div>
      <Header size='medium'>
        <StatusColor key={uuid.v4()} status={status} />
      </Header>
      {sortedTasks.map(task => {
        const { _id, title, status, priority, type, description } = task
        const shortTitle = title.substring(0, 35)
        const shortDesc = description.substring(0, 70)

        return (
          <Grid.Column style={{margin: '0px 10px 10px 10px'}}>
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
          </Grid.Column>
        )
      })}
    </div>
  )
}

KanbanColumn.propTypes = {}

const mapStateToProps = state => ({})

export default withRouter(connect(mapStateToProps, {})(KanbanColumn))
