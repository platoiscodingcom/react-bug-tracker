import React, { useEffect, useState }  from 'react'
import axios from 'axios'
import { Button } from 'semantic-ui-react'
import { OPEN, PROJECTS_PATH, PROJECT, TASKS_PATH  } from '../../Constants'

const OpenButton = ({ id, setDocument, documentType }) => {
  const [PATH, setPath] = useState('')

  useEffect(() => {
    if (documentType === PROJECT) {
      setPath(PROJECTS_PATH)
    } else {
      setPath(TASKS_PATH)
    }
  }, [documentType])

  const open = id => {
    axios
      .put(`${PATH}/${id}/${OPEN}`)
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
    <Button color='grey' onClick={() => open(id)}>
      <i className='fas fa-check' />
      {OPEN}
    </Button>
  )
}

export default OpenButton
