import { GET_PROJECT, GET_PROJECTS, DELETE_PROJECT } from '../actions/types'

const initialState = {
  projects: [],
  project: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROJECT:
      return state
    case GET_PROJECTS:
      return state
    case DELETE_PROJECT:
      return {
        ...state,
        //remvove from state without page reload
        projects: state.projects.filter(
          project => project._id !== action.payload
        )
      }
    default:
      return state
  }
}
