import { GET_TASK, GET_TASKS, DELETE_TASK, GET_ASSIGNED_TASKS } from '../actions/types'

const initialState = {
  tasks: [],
  task: {},
  loading: true,
}

export default function (state = initialState, action){
  switch(action.type){
    case GET_TASK:
      return {
        ...state,
        task: action.payload,
        loading: false
      }
    case GET_TASKS:
      return {
        ...state,
        tasks: action.payload,
        loading: false
      }
    case GET_ASSIGNED_TASKS:
      return{
        ...state,
        tasks: action.payload,
        loading: false
      }
    case DELETE_TASK:
      return {
        ...state,
        //remvove from state without page reload
        tasks: state.tasks.filter(
          task => task._id !== action.payload
        )
      }
    default:
      return state
  }
}