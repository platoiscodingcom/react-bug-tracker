import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Card, Button, Grid, Divider } from 'semantic-ui-react'
import CardLoader from '../../components/loader/CardLoader'
import StatusColor from '../../components/projects/status/StatusColor'
import uuid from 'uuid'

const List = ({ match }) => {
  const [projects, setProject] = useState([])

  useEffect(
    () => {
      axios.get('/api/projects/').then(res => {
        setProject(res.data)
      })
    },
    [match]
  )

  if (projects === 'undefined' || projects.lenght === 0 || projects === null) {
    return <CardLoader />
  } else {
    return (
      <Container>
        <Grid>
          <Grid.Column textAlign='right'>
            <Button color='black' as={Link} to={`${match.url}/create`}>
              <i className='fas fa-plus' />New Project
            </Button>
          </Grid.Column>
        </Grid>
        <Card.Group>
          {projects.map(project => {
            const { _id, name, status, categories, description } = project
            const shortName = name.substring(0, 25)
            const shortDesc = description.substring(0, 150)

            return (
              <Card style={{ boxShadow: 'none', borderRadius: '0' }} key={_id}>
                <Card.Content>
                  <Card.Header style={{ marginTop: '10px' }}>
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
                        to={`/categories/${cat._id}`}
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
                      to={`projects/details/${_id}`}
                      basic
                      color='black'
                    >
                      Details
                    </Button>
                    <Button as={Link} to={`${match.url}/${_id}`} color='black'>
                      Edit
                    </Button>
                  </div>
                </Card.Content>
              </Card>
            )
          })}
        </Card.Group>
      </Container>
    )
  }
}

export default List
