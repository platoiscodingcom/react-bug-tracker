import { GET_WT_FOR_PROJECT, GET_WT_FOR_TASK } from '../actions/types'

const initialState = {
  workingTime: {},
  loading: true
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_WT_FOR_PROJECT:
      return {
        ...state,
        workingTime: action.payload,
        loading: false
      }
    case GET_WT_FOR_TASK:
      return {
        ...state,
        workingTime: action.payload,
        loading: false
      }

    default:
      return state
  }
}
