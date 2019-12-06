import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from 'semantic-ui-react'
import { STOP, STOPPROGRESS, PROJECTS_PATH, PROJECT, TASKS_PATH  } from '../../Constants'

const StopButton = ({ id, setDocument, documentType }) => {
  const [PATH, setPath] = useState('')

  useEffect(() => {
    if (documentType === PROJECT) {
      setPath(PROJECTS_PATH)
    } else {
      setPath(TASKS_PATH)
    }
  }, [documentType])

  const stop = id => {
    axios
      .put(`${PATH}/${id}/${STOP}`)
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
    <Button color='grey' onClick={() => stop(id)}>
      <i className='fas fa-stop-circle' />
      {STOPPROGRESS}
    </Button>
  )
}

export default StopButton
