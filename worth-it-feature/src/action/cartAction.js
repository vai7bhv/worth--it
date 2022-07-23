import axios from 'axios'
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from '../reducers/constant/allConstant'

export const addToCart = (id) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/product/${id}`)

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      SellerName: data.product.userName,
      SellerEmail: data.product.userEmail,
    },
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeCartItem = (id) => async (dispatch, getState) => {
  console.log(id)
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  })

  localStorage.setItem('shippingInfo', JSON.stringify(data))
}
