import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { confirmRegistration } from './../../actions/authentication';

const Confirmation = ({match, history, auth, confirmRegistration}) => {

  useEffect(()=> {
    console.log('token', match.params.token)
    confirmRegistration(match.params.token)
    if(auth)console.log('auth', auth)
  }, [match])

  useEffect(()=> {
    if(auth)console.log('auth', auth)
  }, [auth])

  return (
    <div>
      confirmation
    </div>
  )
}



Confirmation.propTypes = {
  auth: PropTypes.object.isRequired,
  confirmRegistration: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { confirmRegistration })(withRouter(Confirmation))
