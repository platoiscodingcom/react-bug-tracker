import { GET_WORKING_TIME_ERRORS, GET_LOGS } from './types'
import axios from 'axios'
import { WORKING_TIME_LOG_PATH, GET_LOGS_PATH } from '../Constants'

export const createWorkingTimeLog = ( workingTimeLog,documentId) => async dispatch => {

  await axios
    .post(`${WORKING_TIME_LOG_PATH}/${documentId}`, workingTimeLog)
    .then(() => {
      dispatch({
        type: GET_WORKING_TIME_ERRORS,
        payload: {}
      })
    })
    .catch(error => {
      dispatch({
        type: GET_WORKING_TIME_ERRORS,
        payload: error.response.data
      })
      console.log(error)
    })
}


export const getLogs = documentId => async dispatch => {
  await axios
  .get(`${GET_LOGS_PATH}/${documentId}`)
  .then(res => {
    dispatch({
      type: GET_LOGS,
      payload: res.data
    })
  })
  .catch(error => {
    dispatch({
      type: GET_WORKING_TIME_ERRORS,
      payload: error.response.data
    })
    console.log(error)
  })
}
