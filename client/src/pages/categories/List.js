import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Grid, Table } from 'semantic-ui-react';

const List = ({match}) => {
  const [categories, setCategories] = useState([]);

  const loadCategories = () =>{
    axios.get('/api/categories/')
      .then(response => {
        setCategories(response.data)
      })
  }
  useEffect(() => {
    loadCategories();
  }, [])

  const deleteCategory = _id =>{
    axios.delete(`/api/categories/${_id}`)
      .then(() => {
        loadCategories();
      })
  }

  return(
    <div>
      <Grid>
        <Grid.Column textAlign='right'>
          <Button color='black' as={Link} to={`${match.url}/create`}>
          <i className="fas fa-plus"></i>New Category 
          </Button>
        </Grid.Column>
      </Grid>
      <Table singleLine columns={4} striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Category</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {categories.map(category => {
            const { _id, name} = category
            return (
              <Table.Row key={_id}>
                <Table.Cell>{name}</Table.Cell>
                <Table.Cell textAlign='center'>
                  <Button
                    basic
                    color='blue'
                    as={Link}
                    to={`${match.url}/${_id}`}
                  >
                    Edit
                  </Button>
                  <Button basic color='red' onClick={() => deleteCategory(_id)}>
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </div>
  );
}

export default List;