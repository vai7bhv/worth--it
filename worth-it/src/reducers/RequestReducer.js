import {
  CLEAR_ERROR,
  REQUEST_DETAILS_REQUEST,
  REQUEST_DETAILS_FAIL,
  REQUEST_DETAILS_SUCCESS,
  NEW_REQUEST_REQUEST,
  NEW_REQUEST_SUCCESS,
  NEW_REQUEST_FAIL,
  MY_REQUEST_REQUEST,
  MY_REQUEST_SUCCESS,
  MY_REQUEST_FAIL,
  DELETE_REQUEST_REQUEST,
  DELETE_REQUEST_SUCCESS,
  DELETE_REQUEST_FAIL,
  DELETE_REQUEST_RESET,
  ALL_REQUEST_REQUEST,
  ALL_REQUEST_SUCCESS,
  ALL_REQUEST_FAIL,
} from './constant/allConstant'

export const requestReducer = (state = { request: [] }, action) => {
  switch (action.type) {
    case REQUEST_DETAILS_REQUEST:
      return {
        loading: true,
        isAuthUser: false,
      }
    case REQUEST_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthUser: true,
        request: action.payload,
      }
    case REQUEST_DETAILS_FAIL:
      return {
        ...state,
        loading: true,
        isAuthUser: false,
        request: null,
      }
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      }

    default:
      return state
  }
}

export const newRequestReducer = (state = { request: [] }, action) => {
  switch (action.type) {
    case NEW_REQUEST_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case NEW_REQUEST_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        request: action.payload.product,
      }
    case NEW_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export const myRequestReducer = (state = { request: [] }, action) => {
  switch (action.type) {
    case MY_REQUEST_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case MY_REQUEST_SUCCESS:
      return {
        loading: false,
        myRequests: action.payload,
      }

    case MY_REQUEST_FAIL:
      return {
        loading: true,
        error: action.payload,
      }

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      }

    default:
      return state
  }
}

export const allRequestReducer = (state = { requests: [] }, action) => {
  switch (action.type) {
    case ALL_REQUEST_REQUEST:
      return {
        loading: true,
        requests: [],
      }
    case ALL_REQUEST_SUCCESS:
      return {
        loading: false,
        requests: action.payload,
      }
    case ALL_REQUEST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export const deleteRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REQUEST_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case DELETE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      }

    case DELETE_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case DELETE_REQUEST_RESET:
      return {
        ...state,
        isDeleted: false,
      }

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      }

    default:
      return state
  }
}
