import {
  ADMIN_PRODUCT_FAIL,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAILED,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  MY_PRODUCTS_FAIL,
  MY_PRODUCTS_REQUEST,
  MY_PRODUCTS_SUCCESS,
  NEW_PRODUCT_FAILED,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_FAILED,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
} from '../reducers/constant/allConstant'
import axios from 'axios'

export const getProduct =
  (keyword = '', price = [0, 1000], category) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST })
      let link = `/api/products?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}`

      if (category === 'All') category = ''
      if (category)
        link = `/api/products?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`

      console.log(link)
      const { data } = await axios.get(link)

      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      })
    } catch (err) {
      dispatch({
        type: ALL_PRODUCT_FAILED,
        payload: err,
      })
    }
  }

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST })
    const { data } = await axios.get(`/api/product/${id}`)

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    })
  } catch (err) {
    dispatch({
      type: PRODUCT_DETAILS_FAILED,
      payload: err.response.data.message,
    })
  }
}

export const createProduct =
  (name, description, price, category, images, department, sem, mobileNo) =>
  async (dispatch) => {
    try {
      dispatch({ type: NEW_PRODUCT_REQUEST })

      const config = {
        headers: { 'Content-Type': 'application/json' },
      }

      const { data } = await axios.post(
        `/api/product/new`,
        {
          name,
          description,
          price,
          category,
          images,
          department,
          sem,
          mobileNo,
        },
        config
      )

      dispatch({
        type: NEW_PRODUCT_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: NEW_PRODUCT_FAILED,
        payload: error.response.data.message,
      })
    }
  }

export const getMyProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: MY_PRODUCTS_REQUEST,
    })

    const { data } = await axios.get('/api/myProducts')

    dispatch({
      type: MY_PRODUCTS_SUCCESS,
      payload: data.products,
    })
  } catch (error) {
    dispatch({
      type: MY_PRODUCTS_FAIL,
      payload: error.response.data.message,
    })
  }
}

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST })

    const { data } = await axios.delete(`/api/product/${id}`)

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    })
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    })
  }
}

export const updateProduct =
  (id, name, description, price, category, images, productStatus) =>
  async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PRODUCT_REQUEST })

      const config = {
        headers: { 'Content-Type': 'application/json' },
      }
      console.log(images)
      const { data } = await axios.put(
        `/api/product/${id}`,
        { name, description, price, category, images, productStatus },
        config
      )

      dispatch({
        type: UPDATE_PRODUCT_SUCCESS,
        payload: data.success,
      })
    } catch (error) {
      dispatch({
        type: UPDATE_PRODUCT_FAIL,
        payload: error.response.data.message,
      })
    }
  }

//admin products
export const getAdminProduct = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST })

    const { data } = await axios.get('/api/admin/products')

    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data.products,
    })
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    })
  }
}
