import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from 'semantic-ui-react'
import { STARTPROGRESS, START, PROJECTS_PATH, PROJECT, TASKS_PATH } from '../../Constants'

const StartButton = ({ id, setDocument, documentType}) => {
  const [PATH, setPath] = useState('')

  useEffect(() => {
    if (documentType === PROJECT) {
      setPath(PROJECTS_PATH)
    } else {
      setPath(TASKS_PATH)
    }
  }, [documentType])

  const start = id => {
    axios
      .put(`${PATH}/${id}/${START}`)
      .then(res => {
        if (res.status === 200) {
          axios
            .get(`${PATH}/${id}`)
            .then(response => {
              setDocument(response.data)
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
    <Button color='grey' onClick={() => start(id)}>
      <i className='far fa-play-circle' />
      {STARTPROGRESS}
    </Button>
  )
}

export default StartButton
