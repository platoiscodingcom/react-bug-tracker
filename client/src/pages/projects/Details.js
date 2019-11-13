import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Card, Icon, List } from 'semantic-ui-react';

const Details = ({match}) =>{
  const [project, setProject] = useState({
    name: '',
    status: '',
    description: '',
    categories:[]
  })
  useEffect(() => {
    axios.get(`/api/projects/${match.params._id}`).then(response => {
      setProject(response.data)
    });
    
  }, [match])

  const {_id, name, status, description, categories} = project;
  console.log(categories);
  return(

    
    <Container textAlign='left'>
    <Card fluid>
      <Card.Content header={name} />
      <Card.Content>
        <List>
          <List.Item>
            <div className="ui label">Status:</div><div>{status}</div>
          </List.Item>
          <List.Item>
            <div className="ui label">Categories:</div>
            {categories.forEach((cat) =>{
                return <div>name of cat</div>
            })}
          </List.Item>
        </List>
      </Card.Content>
      <Card.Content description= {description} />
      <Card.Content extra>
        <Icon name='user' />Nbr of Tasks
      </Card.Content>
    </Card>
    
    </Container>
    

    

  )
}

export default Details;