import {
  //GET_ALL_ACTIVITIES,
  GET_PROJECT_ACTIVITY,
  //GET_TASK_ACTIVITY,
  //GET_USER_ACTIVITY,
  GET_ACTIVITY_ERRORS
} from './types'
import axios from 'axios'

export const getAllctivities = () => async dispatch => {}

export const getActivityByProject = id => async dispatch => {
  await axios.get(`/api/activity/project/${id}`)
  .then(res =>{
    console.log('res.data ActivityByProject', res.data)
    dispatch({
      type: GET_PROJECT_ACTIVITY,
      payload: res.data
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

export const getActivityByTask = taskId => async dispatch => {}

export const getActivityByUser = userId => async dispatch => {}
