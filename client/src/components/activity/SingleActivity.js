import React, { useEffect, useState } from 'react'
import { Feed, Card, Container, FeedEvent } from 'semantic-ui-react'
import { withRouter, Link } from 'react-router-dom'

const SingleActivity = ({ activity }) => {
  const {
    _id,
    action,
    documentId,
    documentType,
    documentName,
    createdAt,
    user
  } = activity

  console.log('hi im single')
  
  return (
    <Feed.Event>
      <Feed.Label icon='folder open' />
      <Feed.Content>
        <Feed.Date content={createdAt} />
        <Feed.Summary>
          {user.name} did {action} in {documentType} {documentName}
        </Feed.Summary>
      </Feed.Content>
    </Feed.Event>
  )
}

export default SingleActivity
