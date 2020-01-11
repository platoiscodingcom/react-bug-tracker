import {
  GET_ALL_ACTIVITIES,
  GET_PROJECT_ACTIVITY,
  GET_TASK_ACTIVITY,
  GET_USER_ACTIVITY
} from '../actions/types'

const initialState = {
  activties: [],
  loading: true
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_ACTIVITIES:
      return {
        ...state,
        activties: action.payload
      }
    case GET_PROJECT_ACTIVITY:
      return {
        ...state,
        activties: action.payload
      }
    case GET_TASK_ACTIVITY:
      return {
        ...state,
        activties: action.payload
      }
    case GET_USER_ACTIVITY:
      return {
        ...state,
        activties: action.payload
      }
    default:
      return state
  }
}
