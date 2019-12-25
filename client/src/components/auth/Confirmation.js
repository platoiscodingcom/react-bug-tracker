import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { confirmRegistration } from './../../actions/authentication';
import {Card, Container} from 'semantic-ui-react'

const Confirmation = ({match, history, auth, confirmRegistration}) => {

  useEffect(()=> {
    confirmRegistration(match.params.token)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match])

  useEffect(()=> {
    if(auth)console.log('auth', auth)
  }, [auth])

  return (
    <Container>
    <Card>
    <Card.Header>
    Confirmation Successful
    </Card.Header>
    <Card.Content>
    You may log in now
    </Card.Content>
    </Card>
    </Container>
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
