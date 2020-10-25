import { GET_WORKING_TIME_ERRORS, GET_WT_FOR_PROJECT, GET_WT_FOR_TASK } from './types'
import axios from 'axios'
import { WORKING_TIME_LOG_PATH, GET_WT_FOR_PROJECT_PATH, GET_WT_FOR_TASK_PATH } from '../Constants'

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


export const getWorkingTimeForProject = documentId => async dispatch => {
  console.log('getWorkingLogs')
  await axios
  .get(`${GET_WT_FOR_PROJECT_PATH}/${documentId}`)
  .then(res => {
    dispatch({
      type: GET_WT_FOR_PROJECT,
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


export const getWorkingTimeForTask = documentId => async dispatch => {
  await axios
  .get(`${GET_WT_FOR_TASK_PATH}/${documentId}`)
  .then(res => {
    dispatch({
      type: GET_WT_FOR_TASK,
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