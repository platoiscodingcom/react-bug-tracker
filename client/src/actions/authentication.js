import axios from 'axios'
import {
  GET_ERRORS,
  GET_LOGIN_ERRORS,
  SET_CURRENT_USER,
  CONFIRM_REGISTRATION,
  GET_REGISTRATION_ERRORS
} from './types'
import setAuthToken from '../setAuthToken'
import jwt_decode from 'jwt-decode'

export const registerUser = (user, history) => dispatch => {
  axios
    .post('/api/users/register', user)
    .then(res => {
      dispatch({
        type: GET_REGISTRATION_ERRORS,
        payload: {}
      })
      history.push('/login')
    })
    .catch(err => {
      dispatch({
        type: GET_REGISTRATION_ERRORS,
        payload: err.response.data
      })
    })
}

export const loginUser = user => dispatch => {
  axios
    .post('/api/users/login', user)
    .then(res => {
      const { token } = res.data
      localStorage.setItem('jwtToken', token)
      setAuthToken(token)
      const decoded = jwt_decode(token)
      dispatch(setCurrentUser(decoded))
      dispatch({
        type: GET_LOGIN_ERRORS,
        payload: {}
      })
    })
    .catch(err => {
      dispatch({
        type: GET_LOGIN_ERRORS,
        payload: err.response.data
      })
    })
}

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

export const logoutUser = history => dispatch => {
  try {
    localStorage.removeItem('jwtToken')
    setAuthToken(false)
    dispatch(setCurrentUser({}))
    history.push('/login')
  } catch (error) {
    console.log(error)
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    })
  }
}

export const confirmRegistration = token => async dispatch => {
  //console.log('/api/users/confirmation/' + token)
  await axios
    .put('/api/users/confirmation/' + token)
    .then(res => {
      console.log('dispatching this', res.data)
      dispatch({
        type: CONFIRM_REGISTRATION,
        payload: res.data
      })
      dispatch({
        type: GET_REGISTRATION_ERRORS,
        payload: {}
      })
    })
    .catch(err => {
      dispatch({
        type: GET_REGISTRATION_ERRORS,
        payload: err.response.data
      })
    })
}

export const requestPasswordReset = email => async dispatch =>{

  await axios
    .post('/api/users/requestPasswordReset', email)
    .then(res => {
      dispatch({
        type: GET_ERRORS,
        payload: {}
      })
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}
