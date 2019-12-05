import React from 'react';
import axios from 'axios';
import { Button} from 'semantic-ui-react';
import {CLOSE} from '../../helper/Select';


const CloseButton = ({projectId, setProject}) => {

  const closeProject = projectId =>{

    axios.put(`/api/projects/${projectId}/${CLOSE}`)
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
      onClick={() => closeProject(projectId)}>
      <i className="fas fa-check"></i>{CLOSE}
    </Button>
    )
}

export default CloseButton;
