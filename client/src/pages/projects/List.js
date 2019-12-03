import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, Button, Grid} from 'semantic-ui-react';

const List = ({ match }) => {
  const [projects, setProject] = useState([]);

  useEffect(() => {
    axios.get('/api/projects/')
      .then(res => {
        setProject(res.data);
      })
  }, [match])


  console.log("projects", projects);
  
  return (
    <Container>
      <Grid>
        <Grid.Column textAlign='right'>
          <Button color='black' as={Link} to={`${match.url}/create`}>
          <i className="fas fa-plus"></i>New Project
          </Button>
        </Grid.Column>
      </Grid>
      <Card.Group>
        {projects.map(project => {
          const { _id, name, status, categories, description} = project
          return (
            <Card  style={{boxShadow: "none", borderRadius: "0"}} key={_id}>
              <Card.Content>
                <Card.Header>{`${name}`}</Card.Header>
                <Card.Meta>
                  {categories.map(cat => <span key={cat._id}>{`${cat.name}`}</span>)}
                </Card.Meta>
                <Card.Description>{`${description}`}</Card.Description>
                <Card.Description>{`${status}`}</Card.Description>
              </Card.Content>

              <Card.Content extra>
                <div className='ui two buttons'>
                  <Button as={Link} to={`projects/details/${_id}`} basic color='black'>
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

export default List;
