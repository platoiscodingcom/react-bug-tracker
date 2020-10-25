import React from 'react'
import { Container, Card, Placeholder } from 'semantic-ui-react'

const DetailsLoader = () => {
  return (
    <div>
      <Container>
        <Card fluid>
          <Card.Content>
            <Placeholder inverted fluid>
              <Placeholder.Paragraph>
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Paragraph>
              <Placeholder.Paragraph>
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Paragraph>
            </Placeholder>
          </Card.Content>
          <Card.Content textAlign='right' />
        </Card>

        
      </Container>
    </div>
  )
}

export default DetailsLoader
