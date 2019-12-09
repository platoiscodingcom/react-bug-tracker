import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from 'semantic-ui-react'
import { PROJECT, TASK, PROJECTS_PATH, TASKS_PATH } from '../Constants'
import { CLOSE, OPEN, START, STOP, REOPEN, STOPPROGRESS, STARTPROGRESS } from '../Constants'


const ButtonEvent = ({ id, setDocument, documentType, event }) => {
  const [PATH, setPath] = useState('')

  useEffect(() => {
    if (documentType === PROJECT) {
      setPath(PROJECTS_PATH)
    } else if(documentType === TASK) {
      setPath(TASKS_PATH)
    }
    else{
      return console.error('no such patch');
    }
  }, [documentType])

  const applyButtonEvent = id => {
    axios
      .put(`${PATH}/${id}/${event}`)
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
    
    <Button color='grey' onClick={() => applyButtonEvent(id)}>
      {(event === CLOSE) && <Fragment><i className='fas fa-check' />
      {CLOSE}</Fragment>}

      {(event === START) && <Fragment><i className='far fa-play-circle' />
      {STARTPROGRESS}</Fragment>}

      {(event === REOPEN) && <Fragment><i className='far fa-folder-open' />
      {REOPEN}</Fragment>}

      {(event === STOP) && <Fragment><i className='fas fa-stop-circle' />
      {STOPPROGRESS}</Fragment>}

      {(event === OPEN) && <Fragment><i className="far fa-folder-open"></i>
      {OPEN}</Fragment>}

    </Button>
  )
}

export default ButtonEvent
