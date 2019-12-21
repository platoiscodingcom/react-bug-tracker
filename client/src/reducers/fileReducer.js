import { GET_FILE, GET_FILES, DELETE_FILE} from './../actions/types';

const initialState = {
  files: [],
  file: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case DELETE_FILE:
      return {
        ...state,
        //remove from state without page reload
        files: state.files.filter(
          file => file._id !== action.payload
        )
      }
    case GET_FILES:
      return {
        ...state,
        files: action.payload
      }
    case GET_FILE:
      return {
        ...state,
        file: action.payload
      }
    default:
      return state
  }
}
