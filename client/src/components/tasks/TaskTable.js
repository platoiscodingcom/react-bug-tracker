import axios from 'axios';
import React from 'react';
import { Button, Table } from 'semantic-ui-react';
import ListLoader from '../../components/loader/ListLoader';
import {TypeIcon, PriorityCellColor} from '../../components/tasks/TaskIcons';
import StatusColor from '../../components/projects/status/StatusColor';
import { Link } from 'react-router-dom';
import uuid from 'uuid';
import {UNDEFINED, TASKS_PATH, PROJECTS_PATH, TASKS_DETAILS, TASKS_HOME} from '../Constants';

const TaskTable = ({tasks, setProject, match}) => {

  const deleteTask = _id => {
    axios.delete(`${TASKS_PATH}/${_id}`).then(() => {
      axios.get(`${PROJECTS_PATH}/${match.params._id}`).then(response => {
        setProject(response.data)
      });
    })
  }

  if(tasks === UNDEFINED|| tasks.length === 0){
    return <ListLoader />
  }else{
  return (
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
  )}
}

export default TaskTable;
