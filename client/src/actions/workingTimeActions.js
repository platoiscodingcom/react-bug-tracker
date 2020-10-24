import { GET_WORKING_TIME_ERRORS } from './types'
import axios from 'axios'
import { WORKING_TIME_LOG_PATH } from '../Constants'

/*
export const createWorkingTimeLog = (
  workingTimeLog,
  documentId
) => async dispatch => {

  console.error('action')
  console.error('documentId', documentId)
  
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
*/

export const createWorkingTimeLog = (
  workingTimeLog,
  documentId
) => {

  console.error('action')
  console.error('documentId', documentId)
  
 
}