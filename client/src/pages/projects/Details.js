import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Card, List, Button, Table,  Dropdown, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import uuid from 'uuid';
import NewTask from '../../components/tasks/NewTask';
import DetailsLoader from '../../components/loader/DetailsLoader';
import {TypeIcon, PriorityCellColor} from '../../components/tasks/TaskIcons';
import StatusColor from '../../components/projects/status/StatusColor';
import StatusButton from '../../components/projects/status/StatusButton';
import { Redirect } from 'react-router-dom';
import {PROJECTS_PATH, TASKS_PATH, CATEGORIES_HOME, PROJECTS_HOME, TASKS_HOME, TASKS_DETAILS, UNDEFINED} from '../../components/Constants';

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

  useEffect(() => {
    axios.get(`${PROJECTS_PATH}/${match.params._id}`).then(response => {
      setProject(response.data)
    });
  }, [match])

  const deleteTask = _id => {
    axios.delete(`${TASKS_PATH}/${_id}`).then(() => {
      axios.get(`${PROJECTS_PATH}/${match.params._id}`).then(response => {
        setProject(response.data)
      });
    })
  }

  const [redirect, setRedirect] = useState(false);
  const deleteProject = _id => {
    axios.delete(`${PROJECTS_PATH}/${_id}`).then((res) => {
      if (res.status === 200) {
        setRedirect(true);
      }
    })
    .catch(error => {
      console.log(error)
    })
  }

  const {_id, name, status, description, categories, tasks} = project;

  const listCat = categories.map((cat) => 
    <span key={cat._id} className="ui label">
      <Link to={`${CATEGORIES_HOME}/${cat._id}`}>{cat.name}</Link>
    </span>);

  if(project === UNDEFINED|| project._id === ''){
    return <DetailsLoader />
  }else{
    return(
      <div>
        {redirect && (<Redirect to={PROJECTS_HOME} push /> )}

          <Container textAlign='left'>
          {showNewTask.show && 
            <NewTask 
              project={project} 
              setShowNewTask={setShowNewTask} 
              showNewTask ={showNewTask} 
              setProject={setProject} 
              match ={match}/>
            }
          <Card fluid>
            <Card.Content className="card-header"><span className="card-header-title">{name}</span>
            <Menu floated="right"  className="card-menu">
              <Dropdown item text='more'>
                <Dropdown.Menu className="card-actions-dropdown">
                  <Dropdown.Item>
                    <div onClick={() => setShowNewTask({show: !showNewTask.show})}>
                      <i className="fas fa-plus"></i>New Task 
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item text='Edit' icon='pencil alternate' as={Link} to={`${PROJECTS_HOME}/${_id}`}/>
                  <Dropdown.Item color={'red'}>
                    <div 
                      onClick={() => deleteProject(_id)}>
                      <i className="fas fa-trash"></i>Delete
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu>
            </Card.Content>
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
              <StatusButton 
                status={status} 
                projectId={_id} 
                setProject={setProject}/>
            </Card.Content>
          </Card>
          </Container>

          
          
          <Container style={{ marginTop: "15px"}}  textAlign='left'>
        <Table  singleLine columns={5} style={{border: "none", borderRadius: "0"}}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Type</Table.HeaderCell>
              <Table.HeaderCell>Priority</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
          
          {tasks.map(task => {
            const { _id, title, type, status, priority} = task;
            const shortTitle = title.substring(0, 25);

            return (
              <Table.Row key={_id}>
                <Table.Cell>{shortTitle}</Table.Cell>
                <Table.Cell><StatusColor key={uuid.v4()} status = {status}></StatusColor></Table.Cell>
                <Table.Cell><TypeIcon key={uuid.v4()} type = {type}></TypeIcon></Table.Cell>
                <PriorityCellColor key={uuid.v4()} priority = {priority}></PriorityCellColor>
                <Table.Cell textAlign='center' className="button-actions">
                  <Button
                    circular
                    compact
                    size='mini'
                    floated='right'
                    color='black'
                    as={Link}
                    to={`${TASKS_DETAILS}/${_id}`}>
                    <i className="fas fa-eye"></i>
                  </Button>  
                  <Button
                    circular
                    compact
                    size='mini'
                    floated='right'
                    color='black'
                    as={Link}
                    to={`${TASKS_HOME}/${_id}`}>
                    <i className="fas fa-pen"></i>
                  </Button>
                  <Button  
                    circular
                    compact
                    size='mini'
                    floated='right' 
                    color='red' 
                    onClick={() => deleteTask(_id)}>
                    <i className="fas fa-trash"></i>
                  </Button>
                  
                </Table.Cell>
              </Table.Row>
            )
          })} 
          </Table.Body>
        </Table>
      </Container>
      
      </div>
    )}
}

export default Details;