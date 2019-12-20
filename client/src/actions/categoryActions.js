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

export const updateCategory = (
  category,
  formData,
  history
) => async dispatch => {
  console.log('updateCategory', category)
  category.name = formData.name
  await axios
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

export const getCategories = (id, history) => async dispatch => {
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
      history.push('/')
    })
}

export const deleteCategory = (id, history) => async dispatch => {
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
