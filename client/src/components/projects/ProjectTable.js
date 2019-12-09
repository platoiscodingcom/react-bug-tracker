import React from 'react'
import {PROJECTS_PATH} from '../Constants'
import axios from 'axios'

const ProjectTable = ({setCategory}) => {

  const deleteProject = _id => {
    axios
      .delete(`${PROJECTS_PATH}/${_id}`)
      .then(res => {
        setCategory()
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div>
      projectTable
    </div>
  )
}

export default ProjectTable
