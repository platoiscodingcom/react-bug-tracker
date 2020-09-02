import React, { useState } from 'react'
import { Grid, Button, Header } from 'semantic-ui-react'
import './../assets/css/style.css'
import Login from '../components/auth/Login'
import Register from '../components/auth/Register'

import { Link } from 'react-router-dom'

const Home = () => {
  const [registerModal, setRegisterModal] = useState(false)

  const showRegisterModal = () => {
    setRegisterModal(!registerModal)
  }

  const [navbarstatus, setNavbarstatus] = useState("closed")

  const toggleNav = () =>{
    if(navbarstatus === "closed"){
      setNavbarstatus("open")
    }else{
      setNavbarstatus("closed")
    }
    
  }

  return (
    <React.Fragment>
    <div className={navbarstatus}>
      <header>
        <div className='container-fluid'>
          <nav className='nav'>
            <div className='menu-toggle' onClick={toggleNav}>
              <i className='fas fa-bars'></i>
              <i className='fas fa-times'></i>
            </div>
            <a href='index.html' className='logo'>
              <img src='images/logo-rosa.png' alt='' />
            </a>
            <ul className='nav-list animate__animated animate__fadeIn'>
              <li className='nav-item'>
                <a href='index.html' className='nav-link'>
                  Home
                </a>
              </li>
              <li className='nav-item'>
                <a href='#' class='nav-link'>
                  About
                </a>
              </li>
              <li className='nav-item'>
                <a href='#' className='nav-link'>
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      </div>

      <div style={{ backgroundColor: 'white', marginTop: '-15px' }}>
        <section id='about' className='section-up'>
          <div className='overlay'>
            <div className='section-b-inner py-5'>
              <div className='loginbox animate__animated animate__fadeIn'>
                <Grid divided='vertically' style={{ marginBottom: '-2rem' }}>
                  <Grid.Row columns={2}>
                    <Grid.Column style={{ marginRight: '-1rem' }}>
                      <div className='loginbox-left'>
                        {registerModal && (
                          <React.Fragment>
                            <Header as='h1' className='loginbox-left-header'>
                              Or Register Here!
                            </Header>
                            <p className='loginbox-left-p'>
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Eveniet, numquam.
                            </p>
                            <Button
                              className='loginbox-left-button'
                              onClick={showRegisterModal}
                            >
                              Register
                            </Button>
                          </React.Fragment>
                        )}
                        {!registerModal && (
                          <React.Fragment>
                            <Header as='h1' className='loginbox-left-header'>
                              Welcome Back!
                            </Header>
                            <p className='loginbox-left-p'>
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Eveniet, numquam.
                            </p>
                            <Button
                              className='loginbox-left-button'
                              onClick={showRegisterModal}
                            >
                              Login
                            </Button>
                          </React.Fragment>
                        )}
                      </div>
                    </Grid.Column>
                    <Grid.Column style={{ padding: '0rem' }}>
                      <div className='loginbox-right'>
                        {registerModal && <Login />}
                        {!registerModal && <Register />}
                      </div>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </div>
            </div>
          </div>
        </section>

        <section className='section-a'>
          <div className='container'>
            <div>
              <div>
                <h1>The Objective of the Future.</h1>
              </div>
              <div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
                  repudiandae rerum libero ipsum asperiores omnis mollitia,
                  nostrum commodi placeat ea itaque modi corrupti corporis nam
                  voluptas aut reprehenderit eaque culpa.
                </p>
              </div>
              <div>
                <Link to={`#`} className='btn btn-read-more'>
                  Read More
                </Link>
              </div>
            </div>
            <div >
              <img
                style={{ marginTop: '50px' }}
                src={require(`./../assets/img/product2.jpeg`)}
                alt=''
              />
            </div>
          </div>
        </section>

        <section id='about' class='section-b'>
          <div className='overlay'>
            <div className='section-b-inner py-5'>
              <div>
                <h3 className='text-2'>Bright & Clear</h3>
                <h2 className='text-5 mt-1'>
                  The Companion of the Professional
                </h2>
                <p className='mt-1'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
                  repudiandae laboriosam quia, error tempore porro ducimus
                  voluptate laborum nostrum iure.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className='section-d'>
          <div className='container'>
            <div>
              <div>
                <img src={require(`./../assets/img/product1.jpg`)} alt='' />
              </div>
            </div>
            <div>
              <div>
                <h1>Find the system that’s right for you</h1>
              </div>
              <div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum
                  voluptas delectus iste dicta amet minima recusandae doloremque
                  quidem distinctio nihil itaque cumque ullam eos, dignissimos
                  animi libero suscipit blanditiis voluptatum!
                </p>
              </div>
              <div>
                <Link to={`#`} className='btn btn-read-more'>
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className='section-e'>
          <div className='container'>
            <div className='poduct-details'>
              <h2>Lorem ipsum dolor sit amet.</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Adipisci illo ut animi porro mollitia nemo voluptatibus debitis
                delectus, assumenda culpa cumque perferendis placeat quidem quae
                quam voluptatem perspiciatis dolor necessitatibus.
              </p>

              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
          </div>
          <div className='container-icons'>
            <div className='prodcut-icon'>
              <i className='fas fa-film'></i>
              <h3>Autofocus</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque,
                amet repellat.
              </p>
            </div>
            <div className='prodcut-icon'>
              <i className='fas fa-eye'></i>
              <h3>Full Frame</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Exercitationem quod obcaecati odit.
              </p>
            </div>
            <div className='prodcut-icon'>
              <i className='fas fa-camera-retro'></i>
              <h3>Built to last</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae ab
                enim voluptates alias, est mollitia iure!
              </p>
            </div>
            <div className='prodcut-icon'>
              <i className='fas fa-award'></i>
              <h3>Customisable</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque,
                sed distinctio?
              </p>
            </div>
          </div>
        </section>

        <footer className='section-footer py-4 bg-primary'>
          <div className='container'>
            <div>
              <h2 className='text-2 mb-1'>Lorem ipsum dolor sit.</h2>
              <Link to={'http://twitter.com'}>
                <i className='fab fa-twitter fa-2x'></i>
              </Link>
              <Link to={'http://facebook.com'}>
                <i className='fab fa-facebook fa-2x'></i>
              </Link>
              <Link to={'http://youtube.com'}>
                <i className='fab fa-youtube fa-2x'></i>
              </Link>
            </div>
            <div>
              <h3>Company Info</h3>
              <ul>
                <li>
                  <Link to={'#'}>All Products</Link>
                </li>
                <li>
                  <Link to={'#'}>About Us</Link>
                </li>
                <li>
                  <Link to={'#'}>Privacy Policy</Link>
                </li>
                <li>
                  <Link to={'#'}>Terms of Service</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3>Blog Posts</h3>
              <ul>
                <li>
                  <Link to={'#'}>Lorem ipsum dolor.</Link>
                </li>
                <li>
                  <Link to={'#'}>Lorem ipsum dolor.</Link>
                </li>
                <li>
                  <Link to={'#'}>Lorem ipsum dolor.</Link>
                </li>
                <li>
                  <Link to={'#'}>Lorem ipsum dolor.</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3>Subscribe</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              <form
                className='mt-1'
                name='email-form'
                method='POST'
                data-netlify='true'
              >
                <div className='email-form'>
                  <span className='form-control-wrap'>
                    <input
                      type='email'
                      name='email'
                      id='email'
                      size='40'
                      className='form-control'
                      placeholder='E-mail'
                    />
                  </span>
                  <button
                    type='submit'
                    value='Submit'
                    className='form-control submit'
                  >
                    <i className='fas fa-chevron-right'></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </footer>
      </div>
    </React.Fragment>
  )
}

export default Home
