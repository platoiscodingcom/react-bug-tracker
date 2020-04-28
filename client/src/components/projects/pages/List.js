import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, Button, Divider } from 'semantic-ui-react'
import CardLoader from '../../loader/CardLoader'
import StatusColor from '../../status/StatusColor'
import uuid from 'uuid'
import {
  PROJECTS_DETAILS,
  PROJECTS_KANBAN,
  PROJECTS_CREATE,
  CATEGORIES_DETAILS
} from '../../../Constants'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getProjects } from './../../../actions/projectActions'


const List = ({ project: { projects }, getProjects, match}) => {
  useEffect(() => {
    getProjects()
  }, [getProjects])


  if (projects == null) return <CardLoader />
  return (
    <Card.Group>
      {projects.map(project => {
        const { _id, name, status, categories, description } = project
        const shortName = name.substring(0, 25)
        const shortDesc = description.substring(0, 150)

        return (
          <Card key={_id}>
            <Card.Content>
              <Card.Header textAlign='center' style={{ marginTop: '10px' }}>
                {shortName}
              </Card.Header>
              <Divider />
              <Card.Description>{shortDesc}</Card.Description>
              <Divider />
              <Card.Description>
                <StatusColor key={uuid.v4()} status={status} />
                {categories.map(cat => (
                  <Button
                    style={{ marginTop: '5px', borderRadius: '5px' }}
                    className='ui label'
                    as={Link}
                    to={`${CATEGORIES_DETAILS}/${cat._id}`}
                    key={cat._id}
                  >
                    {`${cat.name}`}
                  </Button>
                ))}
              </Card.Description>
            </Card.Content>

            <Card.Content extra>
              <div className='ui two buttons'>
                <Button
                  as={Link}
                  to={`${PROJECTS_DETAILS}/${_id}`}
                  basic
                  color='grey'
                  style={{ fontWeight: '700' }}
                >
                  Details
                </Button>
                <Button as={Link} to={`${PROJECTS_KANBAN}/${_id}`} color='green'>
                  Kanban
                </Button>
              </div>
            </Card.Content>
          </Card>
        )
      })}

      <Card>
        <Card.Content>
          <Button as={Link} to={PROJECTS_CREATE}>
            <i className='fas fa-plus' />
            New Project
          </Button>
        </Card.Content>
      </Card>
    </Card.Group>
  )
}

List.propTypes = {
  getProjects: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  project: state.project
})

export default connect(mapStateToProps, { getProjects })(List)