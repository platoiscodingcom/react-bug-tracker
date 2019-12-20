import React, { useEffect, Fragment } from 'react'
import { Container, Card, List, Dropdown, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import DetailsLoader from '../../components/loader/DetailsLoader'
import ProjectTable from '../../components/projects/ProjectTable'
import { CATEGORIES_HOME } from '../../components/Constants'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteCategory, getCategory } from '../../actions/categoryActions'

const Details = ({
  category: { category },
  deleteCategory,
  getCategory,
  history,
  match
}) => {
  useEffect(() => {
    getCategory(match.params._id, history)
  }, [getCategory, match, history])

  const { _id, name } = category

  if (category == null || category._id === '') {
    return <DetailsLoader />
  }
  return (
    <Fragment>
      <Container>
        <Card fluid>
          <Card.Content className='card-header'>
            <span className='card-header-title'>{name}</span>
            <Menu floated='right' className='card-menu'>
              <Dropdown item text='more'>
                <Dropdown.Menu className='card-actions-dropdown'>
                  <Dropdown.Item
                    text='Edit'
                    icon='pencil alternate'
                    as={Link}
                    to={`${CATEGORIES_HOME}/${_id}`}
                  />
                  <Dropdown.Item color={'red'}>
                    <div onClick={() => deleteCategory(_id)}>
                      <i className='fas fa-trash' />
                      Delete
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu>
          </Card.Content>
          <Card.Content>
            <List>
              <List.Item>Name: {name}</List.Item>
            </List>
          </Card.Content>
        </Card>
      </Container>

      <Container style={{ marginTop: '15px' }}>
        <ProjectTable />
      </Container>
    </Fragment>
  )
}

Details.propTypes = {
  deleteCategory: PropTypes.func.isRequired,
  getCategory: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  category: state.category
})

export default connect(mapStateToProps, { deleteCategory, getCategory })(
  Details
)
