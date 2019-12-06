import React from 'react'
import { OPEN, CLOSED, REOPENED, INPROGRESS, UNDEFINED } from '../../Constants'

const StatusColor = ({ status }) => {
  if (!status) return UNDEFINED
  if (status === INPROGRESS) {
    return <span className='ui orange horizontal label'>{`${status}`}</span>
  }
  if (status === REOPENED || status === OPEN) {
    return <span className='ui green horizontal label'>{`${status}`}</span>
  }
  if (status === CLOSED) {
    return <span className='ui horizontal label'>{`${status}`}</span>
  } else {
    // backlog
    return <span className='ui black horizontal label'>{`${status}`}</span>
  }
}

export default StatusColor
