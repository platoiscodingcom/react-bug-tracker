import React from 'react';
import axios from 'axios';
import { Button} from 'semantic-ui-react';
import {STOP, STOPPROGRESS} from '../../helper/Select';


const StopButton = ({projectId, setProject}) => {

  const stopProject = projectId =>{
    
    axios.put(`/api/projects/${projectId}/${STOP}`)
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
      onClick={() => stopProject(projectId)}>
      <i className="fas fa-stop-circle"></i>{STOPPROGRESS}
    </Button>
    )
}

export default StopButton;