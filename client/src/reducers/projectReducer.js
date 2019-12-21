import {
  GET_PROJECT,
  GET_PROJECTS,
  DELETE_PROJECT,
  CLOSE_UPLOAD_MODAL,
  OPEN_UPLOAD_MODAL,
  SET_FILE_UPLOADED_TRUE,
  SET_FILE_UPLOADED_FALSE
} from '../actions/types'

const initialState = {
  projects: [],
  project: {},
  modalOpen: false,
  fileUploaded: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROJECT:
      return {
        ...state,
        project: action.payload,
        modalOpen: false,
        fileUploaded: false
      }
    case CLOSE_UPLOAD_MODAL:
      return {
        ...state,
        modalOpen: false
      }
    case OPEN_UPLOAD_MODAL:
      return {
        ...state,
        modalOpen: true
      }
    case SET_FILE_UPLOADED_TRUE:
      return {
        ...state,
        fileUploaded: true
      }
    case SET_FILE_UPLOADED_FALSE:
      return {
        ...state,
        fileUploaded: false
      }
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload
      }
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
