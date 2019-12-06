import React from 'react'
import { Card, Placeholder } from 'semantic-ui-react'

const UpdateLoader = () => {
  return (
    <div>
      <Card fluid>
        <Card.Content header='loading ...' />
        <Card.Content>
          <Placeholder fluid>
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder>
        </Card.Content>
        <Card.Content extra>
          <Placeholder>
            <Placeholder.Line />
          </Placeholder>
        </Card.Content>
      </Card>
    </div>
  )
}

export default UpdateLoader
