import axios from 'axios'
import {
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  CLEAR_ERROR,
  LOAD_REQUEST,
  LOAD_SUCCESS,
  LOAD_FAILED,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_RESET,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_RESET,
  UPDATE_PASSWORD_FAILED,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from '../reducers/constant/allConstant'

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    })
    const config = { headers: { 'Content-Type': 'application/json' } }

    const { data } = await axios.post(`/api/login`, { email, password }, config)
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
    })
  } catch (error) {
    dispatch({
      type: LOGIN_FAILED,
      payload: error.response.data.message,
    })
  }
}

export const registerUserAction =
  (name, email, password) => async (dispatch) => {
    try {
      const config = { headers: { 'Content-Type': 'application/json' } }

      dispatch({ type: REGISTER_REQUEST })
      const { data } = await axios.post(
        `/api/register`,
        { email, password, name },
        config
      )

      dispatch({
        type: REGISTER_SUCCESS,
        payload: data.user,
      })
    } catch (error) {
      dispatch({
        type: REGISTER_FAILED,
        payload: error.response.data.message,
      })
    }
  }

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_REQUEST,
    })
    const { data } = await axios.get('/api/profile')

    dispatch({
      type: LOAD_SUCCESS,
      payload: data.user,
    })
  } catch (error) {
    dispatch({
      type: LOAD_FAILED,
      payload: error.response.data.message,
    })
  }
}

export const logout = () => async (dispatch) => {
  try {
    await axios.get('/api/logout')

    dispatch({
      type: LOGOUT_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: LOGOUT_FAILED,
      payload: error.response.data.message,
    })
  }
}
export const updateProfile =
  (name, email, department, sem, mobileNo) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PROFILE_REQUEST })
      const config = { headers: { 'Content-Type': 'application/json' } }

      const { data } = await axios.put(
        `/api/profile/update`,
        { name, email, department, sem, mobileNo },
        config
      )

      dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        payload: data.user,
      })
    } catch (error) {
      dispatch({
        type: UPDATE_PROFILE_FAIL,
        payload: error.response.data.message,
      })
    }
  }

export const updatePassword =
  (oldPassword, newPassword, confirmPassword) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PASSWORD_REQUEST })
      const config = { headers: { 'Content-Type': 'application/json' } }

      const { data } = await axios.put(
        `/api/password/update`,
        { oldPassword, newPassword, confirmPassword },
        config
      )

      dispatch({
        type: UPDATE_PASSWORD_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: UPDATE_PASSWORD_FAILED,
        payload: error.response.data.message,
      })
    }
  }

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST })

    const config = { headers: { 'Content-Type': 'application/json' } }
    console.log('email ', email)

    const { data } = await axios.post(`/api/password/forgot`, { email }, config)

    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message })
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    })
  }
}

export const resetPassword =
  (password, confirmPassword, token) => async (dispatch) => {
    try {
      dispatch({ type: RESET_PASSWORD_REQUEST })

      const config = { headers: { 'Content-Type': 'application/json' } }
      console.log(token)
      const { data } = await axios.put(
        `/api/password/reset/${token}`,
        { password, confirmPassword },
        config
      )

      dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success })
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload: error.response.data.message,
      })
    }
  }

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST })
    const { data } = await axios.get(`/api/admin/users`)

    dispatch({ type: ALL_USERS_SUCCESS, payload: data.users })
  } catch (error) {
    dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message })
  }
}

// get  User Details
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST })
    const { data } = await axios.get(`/api/admin/user/${id}`)

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user })
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response.data.message,
    })
  }
}

// Update User
export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST })

    const config = { headers: { 'Content-Type': 'application/json' } }

    const { data } = await axios.put(`/api/admin/user/${id}`, userData, config)

    dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success })
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.message,
    })
  }
}

// Delete User
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST })

    const { data } = await axios.delete(`/api/admin/user/${id}`)

    dispatch({ type: DELETE_USER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response.data.message,
    })
  }
}

export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR })
}
