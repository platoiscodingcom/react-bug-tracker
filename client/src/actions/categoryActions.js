import axios from 'axios'
import { GET_CATEGORY_ERRORS, GET_CATEGORY, UPDATE_CATEGORY } from './types'
import { CATEGORIES_HOME, CATEGORIES_PATH } from '../components/Constants'

export const createCategory = (category, history) => async dispatch => {
  try {
    const res = await axios.post(CATEGORIES_PATH, category)
    history.push(CATEGORIES_HOME)
    dispatch({
      type: GET_CATEGORY_ERRORS,
      payload: {}
    })
  } catch (error) {
    dispatch({
      type: GET_CATEGORY_ERRORS,
      payload: error.response.data
    })
  }
}

export const updateCategory = (category, history) => async dispatch => {
  axios
    .put(`${CATEGORIES_PATH}/${category._id}`, category)
    .then(() => {
      history.push(CATEGORIES_HOME)
      dispatch({
        type: GET_CATEGORY_ERRORS,
        payload: {}
      })
    })
    .catch(error => {
      dispatch({
        type: GET_CATEGORY_ERRORS,
        payload: error.response.data
      })
      console.log(error)
    })
}

export const getCategory = (id, history) => async dispatch =>{
  axios
  .get(`${CATEGORIES_PATH}/${id}`)
  .then(res => {
    dispatch({
      type: GET_CATEGORY,
      payload: res.data
    });
  })
  .catch(error => {
    history.push(CATEGORIES_HOME)
  })
}
