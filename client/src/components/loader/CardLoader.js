import React from 'react';
import { Card, Placeholder} from 'semantic-ui-react';

const CardLoader = () => {
  return (
    <div>
      <Card.Group>
        <Card  style={{boxShadow: "none", borderRadius: "0"}}>
          <Card.Content>
          <Card.Header></Card.Header>
          <Card.Meta>
            loading ....
          </Card.Meta>
          <Card.Description>
            <Placeholder>
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

        <Card  style={{boxShadow: "none", borderRadius: "0"}}>
          <Card.Content>
          <Card.Header></Card.Header>
          <Card.Meta>
            loading ....
          </Card.Meta>
          <Card.Description>
            <Placeholder>
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

        <Card  style={{boxShadow: "none", borderRadius: "0"}}>
          <Card.Content>
          <Card.Header></Card.Header>
          <Card.Meta>
            loading ....
          </Card.Meta>
          <Card.Description>
            <Placeholder>
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

        <Card  style={{boxShadow: "none", borderRadius: "0"}}>
          <Card.Content>
          <Card.Header></Card.Header>
          <Card.Meta>
            loading ....
          </Card.Meta>
          <Card.Description>
            <Placeholder>
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
    </div>
  )
}

export default CardLoader;
