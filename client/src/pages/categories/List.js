import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Table } from 'semantic-ui-react'
import ListLoader from '../../components/loader/ListLoader'
import {
  CATEGORIES_DETAILS,
  CATEGORIES_HOME,
  CATEGORIES_PATH,
  CATEGORIES_CREATE
} from '../../components/Constants'

const List = () => {
  const [categories, setCategories] = useState([])

  const loadCategories = async () => {
    await axios.get(CATEGORIES_PATH)
    .then(response => {
      setCategories(response.data)
    })
    .catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {
    loadCategories()
  }, [])

  const deleteCategory = _id => {
    axios.delete(`${CATEGORIES_PATH}/${_id}`)
    .then(() => {
      loadCategories()
    })
    .catch(error => {
      console.log(error)
    })
  }

  if (categories == null || categories.lenght === 0) {
    return <ListLoader />
  } else {
    return (
      <Fragment>
        <Table
          singleLine
          columns={2}
          style={{ border: 'none', borderRadius: '0' }}
        >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Category</Table.HeaderCell>
              <Table.HeaderCell>
                <Button
                  color='black'
                  as={Link}
                  to={CATEGORIES_CREATE}
                >
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
      </Fragment>
    )
  }
}

export default List