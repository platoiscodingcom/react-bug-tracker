import axios from 'axios'
import { GET_TASK_ERRORS, GET_TASK, GET_TASKS, DELETE_TASK } from './types'
import { TASKS_HOME, TASKS_PATH } from '../Constants'

export const createTask = (task) => async dispatch => {
  await axios
    .post(TASKS_PATH, task)
    .then(() => {
      dispatch({
        type: GET_TASK_ERRORS,
        payload: {}
      })
    })
    .catch(error => {
      dispatch({
        type: GET_TASK_ERRORS,
        payload: error.response.data
      })
      console.log(error)
    })
}

export const updateTask = (task, formData, history) => async dispatch => {

  await axios
    .put(`${TASKS_PATH}/${task._id}`, formData)
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

export const getTasks = () => async dispatch => {
  await axios
    .get(TASKS_PATH)
    .then(res => {
      dispatch({
        type: GET_TASKS,
        payload: res.data
      })
    })
    .catch(error => {
      dispatch({
        type: GET_TASK_ERRORS,
        payload: error.response.data
      })
      console.log(error)
    })
}
export const getTask = (id, history) => async dispatch => {
  await axios
    .get(`${TASKS_PATH}/${id}`)
    .then(res => {
      dispatch({
        type: GET_TASK,
        payload: res.data
      })
    })
    .catch(error => {
      dispatch({
        type: GET_TASK_ERRORS,
        payload: error.response.data
      })
      console.log(error)
      history.push(TASKS_HOME)
    })
}
export const deleteTask = id => async dispatch => {
  await axios
    .delete(`${TASKS_PATH}/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_TASK,
        payload: id
      })
    })
    .catch(error => {
      dispatch({
        type: GET_TASK_ERRORS,
        payload: error.response.data
      })
      console.log(error)
    })
}
