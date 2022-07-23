import axios from 'axios'

import {
  REQUEST_DETAILS_FAIL,
  REQUEST_DETAILS_SUCCESS,
  REQUEST_DETAILS_REQUEST,
  NEW_REQUEST_REQUEST,
  NEW_REQUEST_SUCCESS,
  NEW_REQUEST_FAIL,
  CLEAR_ERROR,
  DELETE_REQUEST_FAIL,
  DELETE_REQUEST_SUCCESS,
  DELETE_REQUEST_REQUEST,
  ALL_REQUEST_FAIL,
  ALL_REQUEST_SUCCESS,
  ALL_REQUEST_REQUEST,
  MY_REQUEST_FAIL,
  MY_REQUEST_SUCCESS,
  MY_REQUEST_REQUEST,
} from '../reducers/constant/allConstant'

export const createRequest =
  (name, description, userName, email) => async (dispatch) => {
    try {
      dispatch({ type: NEW_REQUEST_REQUEST })

      const config = {
        headers: { 'Content-Type': 'application/json' },
      }
      console.log(name)

      const { data } = await axios.post(
        `/api/request/new`,
        { name, description, userName, email },
        config
      )

      dispatch({
        type: NEW_REQUEST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: NEW_REQUEST_FAIL,
        payload: error.response.data.message,
      })
    }
  }

export const getMyRequests = () => async (dispatch) => {
  try {
    dispatch({
      type: MY_REQUEST_REQUEST,
    })

    const { data } = await axios.get('/api/myRequests')

    dispatch({
      type: MY_REQUEST_SUCCESS,
      payload: data.requests,
    })
  } catch (error) {
    dispatch({
      type: MY_REQUEST_FAIL,
      payload: error.response.data.message,
    })
  }
}

export const getAllRequests = () => async (dispatch) => {
  try {
    dispatch({
      type: ALL_REQUEST_REQUEST,
    })

    const { data } = await axios.get('/api/requests')
    console.log(data.requests)
    dispatch({
      type: ALL_REQUEST_SUCCESS,
      payload: data.requests,
    })
  } catch (error) {
    dispatch({
      type: ALL_REQUEST_FAIL,
      payload: error.response.data.message,
    })
  }
}

export const deleteRequest = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_REQUEST_REQUEST,
    })

    const { data } = await axios.delete(`/api/request/${id}`)

    dispatch({
      type: DELETE_REQUEST_SUCCESS,
      payload: data.success,
    })
  } catch (error) {
    dispatch({
      type: DELETE_REQUEST_FAIL,
      payload: error.response.data.message,
    })
  }
}
