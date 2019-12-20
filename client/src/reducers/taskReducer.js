import { GET_TASK, GET_TASKS, DELETE_TASK } from '../actions/types'

const initialState = {
  tasks: [],
  task: {}
}

export default function (state = initialState, action){
  switch(action.type){
    default:
      return state
  }
}