import { GET_ERRORS } from "../actions/types"

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      //payload contains errors
      console.log('in errorReducer, action:', action)
      return action.payload;

    default:
      return state;
  }
}