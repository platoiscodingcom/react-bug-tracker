import React from 'react'
import axios from 'axios'
import { Button } from 'semantic-ui-react'
import { STARTPROGRESS, START } from '../../Constants'

const StartButton = ({ projectId, setProject }) => {
  const startProject = projectId => {
    axios
      .put(`/api/projects/${projectId}/${START}`)
      .then(res => {
        if (res.status === 200) {
          axios
            .get(`/api/projects/${projectId}`)
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
    <Button color='grey' onClick={() => startProject(projectId)}>
      <i className='far fa-play-circle' />
      {STARTPROGRESS}
    </Button>
  )
}

export default StartButton
