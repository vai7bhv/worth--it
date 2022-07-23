import {
  ADMIN_PRODUCT_FAIL,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAILED,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  CLEAR_ERROR,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_RESET,
  DELETE_PRODUCT_SUCCESS,
  MY_PRODUCTS_FAIL,
  MY_PRODUCTS_REQUEST,
  MY_PRODUCTS_SUCCESS,
  NEW_PRODUCT_FAILED,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_RESET,
  NEW_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_FAILED,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_RESET,
  UPDATE_PRODUCT_SUCCESS,
} from './constant/allConstant'

export const productsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
    case ADMIN_PRODUCT_REQUEST:
      return {
        loading: true,
        products: [],
      }
    case ALL_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productsCount,
      }

    case ADMIN_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      }

    case ALL_PRODUCT_FAILED:
    case ADMIN_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export const productReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
    case UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      }

    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      }
    case DELETE_PRODUCT_FAIL:
    case UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case DELETE_PRODUCT_RESET:
      return {
        ...state,
        isDeleted: false,
      }
    case UPDATE_PRODUCT_RESET:
      return {
        ...state,
        isUpdated: false,
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

export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      }
    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      }
    case PRODUCT_DETAILS_FAILED:
      return {
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export const newProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case NEW_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case NEW_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        product: action.payload.product,
      }
    case NEW_PRODUCT_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case NEW_PRODUCT_RESET:
      return {
        ...state,
        success: false,
      }

    default:
      return state
  }
}

export const myProductsReducer = (state = { myProducts: [] }, action) => {
  switch (action.type) {
    case MY_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case MY_PRODUCTS_SUCCESS:
      return {
        loading: false,
        myProducts: action.payload,
      }

    case MY_PRODUCTS_FAIL:
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
