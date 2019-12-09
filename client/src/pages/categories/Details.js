import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Card, List, Dropdown, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import DetailsLoader from '../../components/loader/DetailsLoader'
import { Redirect } from 'react-router-dom'
import ProjectTable from '../../components/projects/ProjectTable'
import NewProject from '../../components/projects/NewProject'
import {
  CATEGORIES_PATH,
  CATEGORIES_HOME
} from '../../components/Constants'

const Details = ({ match }) => {
  const [showNewProject, setShowNewProject] = useState({show: false})
  const [category, setCategory] = useState({
    _id: '',
    name: '',
    projects: []
  })

  const [redirect, setRedirect] = useState(false)
  const deleteCategory = _id => {
    axios
      .delete(`${CATEGORIES_PATH}/${_id}`)
      .then(res => {
        if (res.status === 200) {
          setRedirect(true)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(
    () => {
      axios.get(`${CATEGORIES_PATH}/${match.params._id}`).then(response => {
        setCategory(response.data)
      })
    },
    [match]
  )

  const { _id, name, projects } = category

  if (category == null) {
    return <DetailsLoader />
  } else {
    return (
      <>
        {redirect && <Redirect to={CATEGORIES_HOME} push />}

        <Container>
          {showNewProject.show && (
            <NewProject
              category={category}
              setShowNewProject={setShowNewProject}
              showNewProject={showNewProject}
              setCategory={setCategory}
              match={match}
            />
          )}

          <Card fluid>
            <Card.Content className='card-header'>
              <span className='card-header-title'>{name}</span>
              <Menu floated='right' className='card-menu'>
                <Dropdown item text='more'>
                  <Dropdown.Menu className='card-actions-dropdown'>
                    <Dropdown.Item>
                      <div
                        onClick={() =>
                          setShowNewProject({show: !showNewProject.show })
                        }
                      >
                        <i className='fas fa-plus' />
                        New Project
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item
                      text='Edit'
                      icon='pencil alternate'
                      as={Link}
                      to={`${CATEGORIES_HOME}/${_id}`}
                    />
                    <Dropdown.Item color={'red'}>
                      <div onClick={() => deleteCategory(_id)}>
                        <i className='fas fa-trash' />
                        Delete
                      </div>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu>
            </Card.Content>
            <Card.Content>
              <List>
                <List.Item>
                    Name: {name}
                </List.Item>
              </List>
            </Card.Content>
          </Card>
        </Container>

        <Container>
          <ProjectTable setCategory = {setCategory} match = {match} projects = {projects}/>
        </Container>
      </>
    )
  }
}

export default Details
