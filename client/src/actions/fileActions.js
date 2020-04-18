import axios from 'axios'
import { GET_FILE_ERRORS, /*GET_FILE, GET_FILES, DELETE_FILE*/ } from './types'
import {PROJECT, TASK, FILES_PATH, PROJECTS_DETAILS} from '../Constants'

export const createFile = (
  file,
  documentPath,
  documentId,
  history
) => async dispatch => {
  await axios
    .put(`${documentPath}/${documentId}/upload`, file)
    .then(() => {
      dispatch({
        type: GET_FILE_ERRORS,
        payload: {}
      })
      history.push(PROJECTS_DETAILS + '/' + documentId)
    })
    .catch(error => {
      dispatch({
        type: GET_FILE_ERRORS,
        payload: error.response.data
      })
      console.log(error)
    })
}

export const updateFile = () => async dispatch => {}

export const getFile = () => async dispatch => {}

export const getFiles = () => async dispatch => {}

export const deleteFile = (id, documentType) => async dispatch => {
  if (documentType === PROJECT) {
    axios
      .delete(`${FILES_PATH}/deleteFromProject/${id}`)
      .catch(error => {
        dispatch({
          type: GET_FILE_ERRORS,
          payload: error.response.data
        })
        console.log(error)
      })
  } else if (documentType === TASK) {
    console.log('delete File from Task')
  } else {
    console.log('error no such docType')
  }
}
