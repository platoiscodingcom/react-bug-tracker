import React from 'react';
import { Container, Card, Placeholder} from 'semantic-ui-react';

const projectDetails = () => {
  return (
    <div>
      <Container>
        <Card fluid>
          <Card.Content header="Project Details">
          </Card.Content>
          <Card.Content>
            <Placeholder fluid>
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
          <Card.Content textAlign='right'>
          </Card.Content>
        </Card>

        <Card.Group itemsPerRow={5}>
          <Card>
            <Card.Content>
              <Placeholder>
                <Placeholder.Image square />
              </Placeholder>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <Placeholder>
                <Placeholder.Image square />
              </Placeholder>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <Placeholder>
                <Placeholder.Image square />
              </Placeholder>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <Placeholder>
                <Placeholder.Image square />
              </Placeholder>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <Placeholder>
                <Placeholder.Image square />
              </Placeholder>
            </Card.Content>
          </Card>
        </Card.Group>

        <Card fluid>
          <Card.Content>
            <Placeholder fluid>
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
        </Card>
      </Container>
    </div>
  )
}

export default projectDetails;
