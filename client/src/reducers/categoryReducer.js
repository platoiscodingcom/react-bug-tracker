import { GET_CATEGORY } from '../actions/types'

const initialState = {
  categories: [],
  category: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORY:
      return {
        ...state,
        category: action.payload
      }
    default:
      return state
  }
}
