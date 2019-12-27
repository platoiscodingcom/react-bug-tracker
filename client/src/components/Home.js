import React from 'react'
import { Container, Header } from 'semantic-ui-react'

const Home = () => {
  return (
    <div>
      <Header as='h1' textAlign='center'>
        MVC mit Express, React and MongoDB
      </Header>
      <Container text textAlign='justified'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit id
        accusamus rerum sapiente soluta cupiditate voluptate incidunt earum,
        itaque eum, doloremque nesciunt dolores corporis tempore debitis
        blanditiis reiciendis voluptates voluptatem.
      </Container>
    </div>
  )
}

export default Home
