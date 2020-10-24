import {GET_WORKING_TIME} from '../actions/types'

const initialState = {
  workingTime: {},
  loading: true
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_WORKING_TIME:
      return {
        ...state,
        workingTime: action.payload,
        loading: false
      }
    
    default:
      return state
  }
}
