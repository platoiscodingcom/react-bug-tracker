import {
  GET_CATEGORY_ERRORS,
  GET_PROJECT_ERRORS,
  GET_TASK_ERRORS
} from '../actions/types'

const initialState = {}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORY_ERRORS:
      return action.payload
    case GET_PROJECT_ERRORS:
      return action.payload
    case GET_TASK_ERRORS:
      return action.payload

    default:
      return state
  }
}
