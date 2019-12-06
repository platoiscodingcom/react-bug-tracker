import React from 'react';
import axios from 'axios';
import { Button} from 'semantic-ui-react';
import {REOPEN} from '../../Constants';


const ReopenButton = ({projectId, setProject}) => {

  const reopenProject = projectId =>{
    
    axios.put(`/api/projects/${projectId}/${REOPEN}`)
    .then((res) => {
      if (res.status === 200) {
        axios.get(`/api/projects/${projectId}`)
        .then(response => {
          setProject(response.data)
        })
        .catch(error => {
          console.log(error)
        })
      }
    })
    .catch(error => {
      console.log(error)
    })
  }

  return (
    <Button  
      color='grey'
      onClick={() => reopenProject(projectId)}>
      <i className="fas fa-check"></i>{REOPEN}
    </Button>
    )
}

export default ReopenButton;