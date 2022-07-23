import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  myProductsReducer,
  newProductReducer,
  productDetailsReducer,
  productReducer,
  productsReducer,
} from './reducers/productReducer'
import {
  userReducer,
  forgotPasswordReducer,
  allUsersReducer,
  profileReducer,
} from './reducers/userReducer'
import { cartReducer } from './reducers/cartReducer'
import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from './reducers/orderReducer'
import {
  allRequestReducer,
  myRequestReducer,
  newRequestReducer,
  requestReducer,
} from './reducers/RequestReducer'
// import {  } from './action/userAction'

const reducer = combineReducers({
  products: productsReducer,
  product: productReducer,
  productDetails: productDetailsReducer,

  myProducts: myProductsReducer,
  user: userReducer,

  // user: registerUserReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  order: orderReducer,
  allOrders: allOrdersReducer,
  orderDetails: orderDetailsReducer,
  newProduct: newProductReducer,
  newRequest: newRequestReducer,
  forgotPassword: forgotPasswordReducer,
  allUsers: allUsersReducer,
  profile: profileReducer,
  requestDetail: requestReducer,
  myRequests: myRequestReducer,
  allRequests: allRequestReducer,

  // removeCart: removeCartItem,
})

let initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingInfo: localStorage.getItem('shippingInfo')
      ? JSON.parse(localStorage.getItem('shippingInfo'))
      : {},
  },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
