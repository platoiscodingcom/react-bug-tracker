import {
  GET_ALL_ACTIVITIES,
  GET_PROJECT_ACTIVITY,
  GET_TASK_ACTIVITY,
  GET_USER_ACTIVITY,
  GET_ACTIVITY_ERRORS
} from './types'
import axios from 'axios'

export const createActivity = activity => async dispatch => {
  await axios
    .post('api/activity', activity)
    .then(() => {
      dispatch({
        type: GET_ACTIVITY_ERRORS,
        payload: {}
      })
    })
    .catch(error => {
      dispatch({
        type: GET_ACTIVITY_ERRORS,
        payload: error.response.data
      })
      console.log(error)
    })
}

export const getAllctivities = () => async dispatch => {}

export const getActivityByProject = projectId => async dispatch => {}

export const getActivityByTask = taskId => async dispatch => {}

export const getActivityByUser = userId => async dispatch => {}
