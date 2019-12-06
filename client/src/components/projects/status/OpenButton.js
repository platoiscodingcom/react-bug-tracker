import React from 'react'
import axios from 'axios'
import { Button } from 'semantic-ui-react'
import { OPEN } from '../../Constants'

const OpenButton = ({ projectId, setProject }) => {
  const openProject = projectId => {
    axios
      .put(`/api/projects/${projectId}/${OPEN}`)
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
    <Button color='grey' onClick={() => openProject(projectId)}>
      <i className='fas fa-check' />
      {OPEN}
    </Button>
  )
}

export default OpenButton
