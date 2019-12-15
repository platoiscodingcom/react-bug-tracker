import axios from 'axios'
import { GET_ERRORS } from './types'
import { CATEGORIES_PATH, CATEGORIES_HOME } from '../components/Constants'

export const createCategory = (category, history) => async dispatch => {
  try {
    const res = await axios
      .post(CATEGORIES_PATH, category)
      history.push(CATEGORIES_HOME)

    console.log('res from createCategory', res)
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
    //contains: {errors: Array(1)}
    console.log('err in createAction', err.response.data)
  }
}
