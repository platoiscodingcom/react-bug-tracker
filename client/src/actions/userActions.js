import axios from 'axios'

import {
  GET_USER_ERRORS,
  GET_USER_INFO,
  GET_PRIVATE_USER_PROFILE,
  DELETE_USER,
  GET_USER_CONTACTS
} from './types'
import { PRIVATE_PROFILE, USERS_PATH } from '../Constants'

export const getPrivateUserProfile = () => {}

export const getUserInfo = () => {}

export const deleteUser = () => {}

export const getContactsInfo = userId => async dispatch => {
  await axios
    .get(`${USERS_PATH}/${userId}`)
    .then(() => {
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
