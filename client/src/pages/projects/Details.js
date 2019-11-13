import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Icon, List } from 'semantic-ui-react';

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
    console.log(project);
  }, [match])

  return(
    
    <Card fluid>
      <Card.Content header={project.name} />
      <Card.Content>
        <List>
          <List.Item>
            <div className="ui label">Status:</div><div>{project.status}</div>
          </List.Item>
          <List.Item>
            <div className="ui label">Categories:</div>
          </List.Item>
        </List>
      </Card.Content>
      <Card.Content description='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.' />
      <Card.Content extra>
        <Icon name='user' />Nbr of Tasks
      </Card.Content>
    </Card>

    

  )
}

export default Details;