import axios from 'axios'
import {
  GET_CATEGORY_ERRORS,
  GET_CATEGORY,
  GET_CATEGORIES,
  DELETE_CATEGORY
} from './types'
import { CATEGORIES_HOME, CATEGORIES_PATH } from '../components/Constants'

export const createCategory = (category, history) => async dispatch => {
  try {
    await axios.post(CATEGORIES_PATH, category)
    dispatch({
      type: GET_CATEGORY_ERRORS,
      payload: {}
    })
    history.push(CATEGORIES_HOME)
  } catch (error) {
    dispatch({
      type: GET_CATEGORY_ERRORS,
      payload: error.response.data
    })
  }
}

export const updateCategory = (
  category,
  formData,
  history
) => async dispatch => {
  category.name = formData.name
  await axios
    .put(`${CATEGORIES_PATH}/${category._id}`, category)
    .then(() => {
      dispatch({
        type: GET_CATEGORY_ERRORS,
        payload: {}
      })
      history.push(CATEGORIES_HOME)
    })
    .catch(error => {
      dispatch({
        type: GET_CATEGORY_ERRORS,
        payload: error.response.data
      })
      console.log(error)
    })
}

export const getCategory = (id, history) => async dispatch => {
  await axios
    .get(`${CATEGORIES_PATH}/${id}`)
    .then(res => {
      dispatch({
        type: GET_CATEGORY,
        payload: res.data
      })
    })
    .catch(error => {
      dispatch({
        type: GET_CATEGORY_ERRORS,
        payload: error.response.data
      })
      console.log(error)
      history.push(CATEGORIES_HOME)
    })
}

export const getCategories = () => async dispatch => {
  await axios
    .get(CATEGORIES_PATH)
    .then(res => {
      dispatch({
        type: GET_CATEGORIES,
        payload: res.data
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

export const deleteCategory = (id) => async dispatch => {
  await axios
    .delete(`${CATEGORIES_PATH}/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_CATEGORY,
        payload: id
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
