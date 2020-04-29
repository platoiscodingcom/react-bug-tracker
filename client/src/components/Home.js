import React from 'react'
import Lightbox from 'react-simple-lightbox'
import './../assets/css/style.css'

import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div style={{ backgroundColor: 'white', marginTop: '-15px' }}>
    <section id='about' class='section-up'>
        <div className='overlay'>
          <div className='section-b-inner py-5'>
            <div className='animated fadeIn'>
              <h3 className='text-2'>Bright & Clear</h3>
              <h2 className='text-5 mt-1'>The Companion of the Professional</h2>
              <p className='mt-1'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
                repudiandae laboriosam quia, error tempore porro ducimus
                voluptate laborum nostrum iure.
              </p>
              <Link to={`#`} className='btn btn-home'>
                Find Out More
              </Link>
              <Link to={`#`} className='btn btn-start'>
                Start Today!
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <section className='section-a'>
        <div className='container'>
          <div>
            <div className='animated fadeIn'>
              <h1>The Objective of the Future.</h1>
            </div>
            <div className='animated fadeInUp'>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
                repudiandae rerum libero ipsum asperiores omnis mollitia,
                nostrum commodi placeat ea itaque modi corrupti corporis nam
                voluptas aut reprehenderit eaque culpa.
              </p>
            </div>
            <div className='animated fadeIn delay-1s'>
              <Link to={`#`} className='btn btn-read-more'>
                Read More
              </Link>
            </div>
          </div>
          <div className='animated fadeIn'>
            <img
              style={{ marginTop: '50px' }}
              src={require(`./../assets/img/product2.jpeg`)}
              alt=''
            />
          </div>
        </div>
      </section>

      <section className='section-d'>
        <div className='container'>
          <div>
            <div className='animated fadeIn'>
              <img src={require(`./../assets/img/product1.jpg`)} alt='' />
            </div>
          </div>
          <div>
            <div className='animated fadeIn'>
              <h1>Find the system that’s right for you</h1>
            </div>
            <div className='animated fadeInUp'>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum
                voluptas delectus iste dicta amet minima recusandae doloremque
                quidem distinctio nihil itaque cumque ullam eos, dignissimos
                animi libero suscipit blanditiis voluptatum!
              </p>
            </div>
            <div className='animated fadeIn delay-1s'>
              <Link to={`#`} className='btn btn-read-more'>
                Read More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id='about' class='section-b'>
        <div className='overlay'>
          <div className='section-b-inner py-5'>
            <div className='animated fadeIn'>
              <h3 className='text-2'>Bright & Clear</h3>
              <h2 className='text-5 mt-1'>The Companion of the Professional</h2>
              <p className='mt-1'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
                repudiandae laboriosam quia, error tempore porro ducimus
                voluptate laborum nostrum iure.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className='section-e'>
        <div className='container'>
          <div className='poduct-details'>
            <h2>Lorem ipsum dolor sit amet.</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
              illo ut animi porro mollitia nemo voluptatibus debitis delectus,
              assumenda culpa cumque perferendis placeat quidem quae quam
              voluptatem perspiciatis dolor necessitatibus.
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

      <section className='section-c'>
        <Lightbox
          style={{
            maxHeight: '65rem',
            overflow: 'hidden'
          }}
        >
          <div className='gallery'>
            <Link to={`./../assets/img/util.jpg`} className='big'>
              <img src={require(`./../assets/img/util.jpg`)} alt='' />
            </Link>
            <Link to={'../assets/img/hand2.jpg'} className='big'>
              <img src={require(`./../assets/img/hand2.jpg`)} alt='' />
            </Link>
            <Link to={'../assets/img/docu.jpg'} className='big'>
              <img src={require(`./../assets/img/docu.jpg`)} alt='' />
            </Link>
            <Link to={'../assets/img/work.jpg'} className='big'>
              <img src={require(`./../assets/img/work.jpg`)} alt='' />
            </Link>
            <Link to={'../assets/img/leaf.jpg'} className='big'>
              <img src={require(`./../assets/img/leaf.jpg`)} alt='' />
            </Link>
          </div>
        </Lightbox>
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
  )
}

export default Home
