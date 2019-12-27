import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from 'semantic-ui-react'
import { PROJECT, TASK, PROJECTS_PATH, TASKS_PATH } from '../../Constants'
import { CLOSE, OPEN, START, STOP, REOPEN, STOPPROGRESS, STARTPROGRESS } from '../../Constants'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProject } from './../../actions/projectActions';
import { getTask } from './../../actions/taskActions';
import { withRouter } from 'react-router';

const ButtonEvent = ({ documentType, event, getProject, getTask, history, match}) => {
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
          if (documentType === PROJECT) {
            getProject(id, history)
          } else if(documentType === TASK) {
            getTask(id, history)
          }
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
  
  return (
    
    <Button color='grey' onClick={() => applyButtonEvent(match.params._id)}>
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


ButtonEvent.propTypes = {
  getProject: PropTypes.func.isRequired,
  getTask: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
})

export default withRouter(connect(mapStateToProps, {getProject, getTask})(ButtonEvent))
