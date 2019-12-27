import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Table } from 'semantic-ui-react'
import ListLoader from '../loader/ListLoader'
import PropTypes from 'prop-types'
import {
  CATEGORIES_DETAILS,
  CATEGORIES_HOME,
  CATEGORIES_CREATE
} from '../../Constants'
import { connect } from 'react-redux'
import { deleteCategory, getCategories } from '../../actions/categoryActions'

const List = ({ category: { categories }, getCategories, deleteCategory }) => {
  useEffect(() => {
    getCategories()
  }, [getCategories])

  if (categories == null || categories.lenght === 0) {
    return <ListLoader />
  }

  return (
    <Table singleLine columns={2}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Category</Table.HeaderCell>
          <Table.HeaderCell>
            <Button color='black' as={Link} to={CATEGORIES_CREATE}>
              <i className='fas fa-plus' />
              New Category
            </Button>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {categories.map(category => {
          const { _id, name } = category
          return (
            <Table.Row key={_id}>
              <Table.Cell>{name}</Table.Cell>
              <Table.Cell textAlign='right' className='button-actions'>
                <Button
                  circular
                  compact
                  size='mini'
                  color='black'
                  as={Link}
                  to={`${CATEGORIES_DETAILS}/${_id}`}
                >
                  <i className='fas fa-eye' />
                </Button>
                <Button
                  circular
                  compact
                  size='mini'
                  color='black'
                  as={Link}
                  to={`${CATEGORIES_HOME}/${_id}`}
                >
                  <i className='fas fa-pen' />
                </Button>
                <Button
                  circular
                  compact
                  size='mini'
                  color='red'
                  onClick={() => deleteCategory(_id)}
                >
                  <i className='fas fa-trash' />
                </Button>
              </Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table>
  )
}

List.propTypes = {
  deleteCategory: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  category: state.category
})

export default connect(mapStateToProps, { getCategories, deleteCategory })(List)
