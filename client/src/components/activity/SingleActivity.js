import React from 'react'
import { Feed} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { REOPENED, CLOSED, INPROGRESS, OPEN, BACKLOG } from '../../Constants'
import uuid from 'uuid'
import StatusColor from '../status/StatusColor'

const SingleActivity = ({ activity }) => {
  const {
    action,
    documentId,
    documentType,
    documentName,
    createdAt,
    user
  } = activity

  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1) + ':'
  }

  const makeLink = documentName => {
    return (
      <Link
        style={{ color: 'green', fontWeight: '600' }}
        to={`/projects/details/${documentId}`}
      >
        {documentName}
      </Link>
    )
  }

  const printAction = action => {
    if (action === 'update') {
      return (
        <React.Fragment>
          {' made an '}
          <span style={{ fontWeight: '600' }}>update</span>
          {' in '}
        </React.Fragment>
      )
    } else if (action === 'create' || action === 'delete') {
      return 'undefied action'
    } else if (
      action === REOPENED ||
      action === CLOSED ||
      action === INPROGRESS ||
      action === BACKLOG ||
      action === OPEN
    ) {
      // return 'changed the status to ' + action + ' '
      return (
        <React.Fragment>
          {' changed the status to '}
          <StatusColor key={uuid.v4()} status={action} />
          {'in '}
        </React.Fragment>
      )
    } else {
      return 'undefined'
    }
  }

  const printIcon = documentType => {
    if (documentType === 'project') {
      return 'folder open'
    } else if (documentType === 'task') {
      return 'FormatListBulletedIcon'
    }
  }

  return (
    <Feed.Event>
      <Feed.Label icon={printIcon(documentType)} />
      <Feed.Content>
        <Feed.Date content={moment(createdAt).fromNow()} />
        <Feed.Summary style={{ fontWeight: '400'}}>
          {user.name}
          {printAction(action)}
          {capitalizeFirstLetter(documentType)} {makeLink(documentName)}
        </Feed.Summary>
      </Feed.Content>
    </Feed.Event>
  )
}

export default SingleActivity
