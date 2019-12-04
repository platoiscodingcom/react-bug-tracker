import React, { useEffect, useState } from 'react';
import { Container, Card} from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

const NoMatch = () => {
  const [redirect, setRedirect] = useState(false);

  useEffect(() =>{
    setTimeout(() => setRedirect(true), 5000);
  }, []);
  
  return (
    <>
    {redirect && (<Redirect to='/' push /> )}
    <Container>
      <Card fluid>
        <Card.Content header={"Page Not Found"} />
        <Card.Content>
          You will be redirected in 5 seconds
        </Card.Content>
      </Card>
    </Container>
    </>
  )
}

export default NoMatch;
