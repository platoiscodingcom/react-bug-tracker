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


const List = ({ project: { projects }, getProjects}) => {
  useEffect(() => {
    getProjects()
  }, [getProjects])


  if (projects === null) return <CardLoader />
  return (
    <Card.Group className="projectcards-group">
      {projects.map(project => {
        const { _id, name, status, categories, description } = project
        const shortName = name.substring(0, 25)
        const shortDesc = description.substring(0, 150)

        return (
          <Card key={_id} className="projectCard">
            <Card.Content>
              <Card.Header textAlign='center' style={{ marginTop: '10px' }}>
                {shortName}
              </Card.Header>
              <Divider className="projectDevider" />
              <Card.Description>{shortDesc}</Card.Description>
              <Divider className="projectDevider"/>
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
                  className="detailsButton"
                >
                  Details
                </Button>
                <Button className="kanbanButton" as={Link} to={`${PROJECTS_KANBAN}/${_id}`} color='green'>
                  Kanban
                </Button>
              </div>
            </Card.Content>
          </Card>
        )
      })}

      <Card className="projectCard">
        <Card.Content>
          <Link className="newprojectButton" to={PROJECTS_CREATE}><i className='fas fa-plus'></i></Link>
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