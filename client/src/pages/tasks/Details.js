import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Card, List, Button} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import {TypeIcon} from '../../components/tasks/TaskIcons';
import StatusColor from '../../components/projects/status/StatusColor';
import uuid from 'uuid';
import { Redirect } from 'react-router-dom';
import DetailsLoader from '../../components/loader/DetailsLoader';

const Details = ({match}) => {
  
  const [task, setTask] = useState({
    _id: '',
    title: '',
    project: '',
    description: '',
    status: '',
    priority: '',
    type: ''
  })

  useEffect(() => {
    axios.get(`/api/tasks/${match.params._id}`).then(response => {
      setTask(response.data)
    })
  }, [match]);

  const [redirect, setRedirect] = useState(false);
  const deleteTask = _id => {
    axios.delete(`/api/tasks/${_id}`).then((res ) => {
      if (res.status === 200) {
        setRedirect(true);
      }
    })
  }

  const {_id, title, status, description, project, priority, type} = task;

  if(task ==="undefined"|| task._id === ''){
    return <DetailsLoader />
  }else{
  return (
    <div>
    {redirect && (<Redirect to='/projects' push />)}
      <Container>
        <Card fluid>
          <Card.Content header={title} />

          <Card.Content>
            <List>
              <List.Item>
                <div>Status:<StatusColor key={uuid.v4()} status = {status}></StatusColor></div>
              </List.Item>
              <List.Item>
                <div>Type:<TypeIcon key={uuid.v4()} type = {type}></TypeIcon></div>
              </List.Item>
              <List.Item>
                <div>Priority:{`${priority}`}</div>
              </List.Item>
              <List.Item>
                <div>Project:<span className="ui label">{project.name}</span></div>
              </List.Item>
            </List>
          </Card.Content>

          <Card.Content description= {description} />

          <Card.Content extra>
            <Button
              color='black'
              as={Link}
              to={`/tasks/${_id}`}
            ><i className="fas fa-pen"></i>Edit</Button>
            <Button  
              color='grey'
              as={Link}
              to={`/tasks/${_id}/close`}
            ><i className="fas fa-check"></i>Close</Button>
            <Button 
              floated='right'
              color='red'
              onClick={() => deleteTask(_id)}
            ><i className="fas fa-trash"></i>Delete</Button>
          </Card.Content>
        </Card>
      </Container>
    </div>
  )}
}

export default Details;
