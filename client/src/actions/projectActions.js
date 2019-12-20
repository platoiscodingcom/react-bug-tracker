import axios from 'axios'
import {
  GET_PROJECT_ERRORS,
  GET_PROJECT,
  GET_PROJECTS,
  DELETE_PROJECT
} from './types'
import { PROJECTS_HOME, PROJECTS_PATH } from '../components/Constants'

export const createProject = (project, history) => async dispatch => {
  await axios
    .post(PROJECTS_PATH, project)
    .then(() => {
      dispatch({
        type: GET_PROJECT_ERRORS,
        payload: {}
      })
    })
    .catch(error => {
      dispatch({
        type: GET_PROJECT_ERRORS,
        payload: error.response.data
      })
      console.log(error)
    })
}
export const updateProject = () => async dispatch => {}
export const getProject = () => async dispatch => {}
export const getProjects = () => async dispatch => {}
export const deleteProject = id => async dispatch => {
  await axios
    .delete(`${PROJECTS_PATH}/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_PROJECT,
        payload: id
      })
    })
    .catch(error => {
      dispatch({
        type: GET_PROJECT_ERRORS,
        payload: error.response.data
      })
      console.log(error)
    })
}
