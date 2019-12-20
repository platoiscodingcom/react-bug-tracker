import axios from 'axios'
import { GET_TASK_ERRORS, GET_TASK, GET_TASKS, DELETE_TASK } from './types'
import { TASKS_HOME, TASKS_PATH } from '../components/Constants'

export const createTask = (task, history) => async dispatch => {
  await axios
    .post(TASKS_PATH, task)
    .then(() => {
      dispatch({
        type: GET_TASK_ERRORS,
        payload: {}
      })
      history.push(TASKS_HOME)
    })
    .catch(error => {
      dispatch({
        type: GET_TASK_ERRORS,
        payload: error.response.data
      })
      console.log(error)
    })
}
export const updateTask = () => async dispatch => {}
export const getTasks = () => async dispatch => {}
export const getTask = () => async dispatch => {}
export const deleteTask = () => async dispatch => {}
