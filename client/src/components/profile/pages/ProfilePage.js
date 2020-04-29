import React, { useEffect, useState } from 'react'
import {
  Card,
  List,
  Header,
  Dropdown,
  Menu,
  Grid,
  Container
} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink, withRouter, Link } from 'react-router-dom'


const ProfilePage = ({auth:{user}}) =>{

  return (

    <div>Your profile</div>
  )
}

ProfilePage.propTypes = {
  /*
  deleteProject: PropTypes.func.isRequired,
  getProject: PropTypes.func.isRequired,
  setUploadModalOpen: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired
  */
 auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default withRouter(  connect(mapStateToProps, {})(ProfilePage))