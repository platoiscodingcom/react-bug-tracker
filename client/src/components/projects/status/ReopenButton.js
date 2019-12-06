import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button } from 'semantic-ui-react'
import { REOPEN, PROJECTS_PATH, PROJECT, TASKS_PATH } from '../../Constants'

const ReopenButton = ({ id, setDocument, documentType }) => {
  const [PATH, setPath] = useState('')

  useEffect(() => {
    if (documentType === PROJECT) {
      setPath(PROJECTS_PATH)
    } else {
      setPath(TASKS_PATH)
    }
  }, [documentType])

  const reopen = id => {
    axios
      .put(`${PATH}/${id}/${REOPEN}`)
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
    <Button color='grey' onClick={() => reopen(id)}>
      <i className='fas fa-check' />
      {REOPEN}
    </Button>
  )
}

export default ReopenButton
