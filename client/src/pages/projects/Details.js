import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Card, List, Button, Table, Popup} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './projects.css';
import uuid from 'uuid';
import NewTask from '../../components/NewTask'

const Details = ({match}) =>{
  const [showNewTask, setShowNewTask] = useState({show: false});
  const [project, setProject] = useState({
    _id: '',
    name: '',
    status: '',
    description: '',
    categories:[],
    tasks: []
  })

  const loadProject = () => {
    axios.get(`/api/projects/${match.params._id}`).then(response => {
      setProject(response.data)
    });
  }

  useEffect(() => {
    loadProject();
  }, [match])

  const deleteTask = _id => {
    axios.delete(`/api/tasks/${_id}`).then(() => {
      loadProject();
    })
  }

  const {_id, name, status, description, categories, tasks} = project;
  const listCat = categories
                    .map((cat) => 
                      <span key={cat._id} className="ui label">
                        <Link to={`/categories/${cat._id}`}>{cat.name}</Link>
                      </span>);

  const StatusColor = (props) =>{
    const status = props.status;
    if(!status) return "undefined";
    if(status === "in progress") {
      return <span className="ui orange horizontal label">{`${status}`}</span>;
    }
    if(status === "open") {
      return <span className="ui green horizontal label">{`${status}`}</span>;
    }
    if(status === "closed") {
      return <span className="ui horizontal label">{`${status}`}</span>;
    }else{
      return <span className="ui black horizontal label">{`${status}`}</span>;
    }
  }

  const TypeIcon = (props) =>{
    const type = props.type;
    
    if(!type)  return <Popup content='Undefined' trigger={<i className="fas fa-question"></i>} />
    if(type === "bug") {
      return <Popup content='Bug' trigger={<i className="fas fa-bug"></i>} />
    }
    if(type === "feature"){
      return <Popup content='Feature' trigger={<i className="fas fa-star"></i>} />
    }
    else{
      return <span>{`${type}`}</span>;
    }
  }

  return(
    <div>
    <Container textAlign='left'>
    <Card fluid>
      <Card.Content header={name} />
      <Card.Content>
        <List>
          <List.Item>
            <div>Status:<StatusColor key={uuid.v4()} status = {status}></StatusColor></div>
          </List.Item>
          <List.Item>
            <div>Categories:{listCat}</div> 
          </List.Item>
        </List>
      </Card.Content>
      <Card.Content description= {description} />
      <Card.Content extra>
        <Button
          color='black'
          as={Link}
          to={`/projects/${_id}`}
        ><i className="fas fa-pen"></i>Edit</Button>
        <Button  
          color='grey'
          as={Link}
          to={`/projects/${_id}/close`}
        ><i className="fas fa-check"></i>Close</Button>
      </Card.Content>
    </Card>
    </Container>

    {showNewTask.show && <NewTask project={project} setShowNewTask={setShowNewTask} showNewTask ={showNewTask} loadProject={loadProject}/>}
    
    <Container style={{ marginTop: "15px"}}  textAlign='left'>
      <Table singleLine columns={4} style={{border: "none", borderRadius: "0"}}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>Priority</Table.HeaderCell>
            <Table.HeaderCell>
              <Button color='black' onClick={() => setShowNewTask({show: !showNewTask.show})}>
                <i className="fas fa-plus"></i>New Task 
              </Button>
              </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
        
        {tasks.map(task => {
          const { _id, title, type, status, priority} = task;
          
          return (
            <Table.Row key={_id}>
              <Table.Cell>{`${title}`}</Table.Cell>
              <Table.Cell><StatusColor key={uuid.v4()} status = {status}></StatusColor></Table.Cell>
              <Table.Cell><TypeIcon key={uuid.v4()} type = {type}></TypeIcon></Table.Cell>
              <Table.Cell>{`${priority}`}</Table.Cell>
              <Table.Cell textAlign='center' className="button-actions">
                <Button
                  color='black'
                  as={Link}
                  to={`/tasks/${_id}`}
                >
                <i className="fas fa-pen"></i>
                </Button>
                <Button color='red' onClick={() => deleteTask(_id)}>
                <i className="fas fa-trash"></i>
                </Button>
                
              </Table.Cell>
            </Table.Row>
          )
        })} 
        </Table.Body>
      </Table>
    </Container>
    
    <Container>
      
    </Container>
    </div>

  )
}

export default Details;