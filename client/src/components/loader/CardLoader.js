import React from 'react'
import { Card, Placeholder, Dimmer } from 'semantic-ui-react'

const CardLoader = () => {
  return (
    <Dimmer active>
      <Card.Group>
        <Card style={{ boxShadow: 'none', borderRadius: '0' }}>
          <Card.Content>
            <Card.Header />
            <Card.Meta>loading ....</Card.Meta>
            <Card.Description>
              <Placeholder inverted>
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder>
            </Card.Description>
          </Card.Content>
        </Card>

        <Card style={{ boxShadow: 'none', borderRadius: '0' }}>
          <Card.Content>
            <Card.Header />
            <Card.Meta>loading ....</Card.Meta>
            <Card.Description>
              <Placeholder inverted>
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder>
            </Card.Description>
          </Card.Content>
        </Card>

        <Card style={{ boxShadow: 'none', borderRadius: '0' }}>
          <Card.Content>
            <Card.Header />
            <Card.Meta>loading ....</Card.Meta>
            <Card.Description>
              <Placeholder inverted>
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder>
            </Card.Description>
          </Card.Content>
        </Card>

        <Card style={{ boxShadow: 'none', borderRadius: '0' }}>
          <Card.Content>
            <Card.Header />
            <Card.Meta>loading ....</Card.Meta>
            <Card.Description>
              <Placeholder inverted>
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder>
            </Card.Description>
          </Card.Content>
        </Card>
      </Card.Group>
    </Dimmer>
  )
}

export default CardLoader
