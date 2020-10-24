import {GET_WORKING_TIME, GET_LOGS} from '../actions/types'

const initialState = {
  workingTime: {},
  logs:[],
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
    case GET_LOGS:
      return{
        ...state,
        logs: action.payload,
        loading: false
      }

    
    default:
      return state
  }
}
