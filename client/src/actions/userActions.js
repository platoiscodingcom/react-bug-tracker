import axios from 'axios'

import {
  GET_USER_ERRORS,
  GET_USER_CONTACTS
} from './types'
import { USERS_PATH } from '../Constants'

export const getPrivateUserProfile = () => {}

export const getUserInfo = () =>{

}

export const updateUserInfo = (user, formData, history) => async dispatch =>{
  await axios
  .put(`${USERS_PATH}/${user._id}`, formData)
  .then(() => {
    dispatch({
      type: GET_USER_ERRORS,
      payload: {}
    })
  })
  .catch(error => {
    dispatch({
      type: GET_USER_ERRORS,
      payload: error.response.data
    })
    console.log(error)
  })
}

export const deleteUser = () => {}

export const getContactsInfo = userId => async dispatch => {
  await axios
    .get(`${USERS_PATH}/${userId}`)
    .then(res => {
      dispatch({
        type: GET_USER_CONTACTS,
        payload: res.data
      })
    })
    .catch(error => {
      dispatch({
        type: GET_USER_ERRORS,
        payload: error.response.data
      })
    })
}
