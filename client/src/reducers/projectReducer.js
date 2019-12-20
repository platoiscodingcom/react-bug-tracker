import { GET_PROJECT, GET_PROJECTS, DELETE_PROJECT } from '../actions/types'

const initialState = {
  projects: [],
  project: {}
}

export default function (state = initialState, action){
  switch(action.type){
    default:
      return state
  }
}