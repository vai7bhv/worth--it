import styled from 'styled-components'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from '../action/orderAction'
import { useAlert } from 'react-alert'
import { Button, MenuItem, Select } from '@mui/material'
import { useState } from 'react'
import { loadUser } from '../action/userAction'
import MetaData from '../component/MetaData'

const Container = styled.div``
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
const Info = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px;
  margin-top: 2vh;
`

const Heading = styled.h2`
  margin-top: 2vh;
  margin-left: 2vh;
  font-weight: 200;
`
const Left = styled.div``
const Address = styled.div`
  margin-top: 3vh;
  margin-bottom: 2vh;
  margin-left: 2vw;
`
const Item = styled.div``
const Image = styled.img`
  width: 10vw;
  height: 15vh;
  cursor: pointer;
  object-fit: contain;
`
const Title = styled.h3`
  margin: 5px;
  font-weight: 200;
`
const Price = styled.h4`
  margin: 1vw;
  font-weight: 200;
`
const Right = styled.div`
  flex: 1;
  border: 1px solid gray;
  border-radius: 10px;
  margin: 10px;
  margin-left: 20px;
  padding: 20px;
  height: 50vh;

  max-width: 25vw;
  height: 40vh;
`
const SummaryTitle = styled.h2`
  font-weight: 200;
`
const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
`
const SummaryText = styled.div``
const SummaryPrice = styled.div``

function OrderDetails() {
  // myOrders orders

  const { order } = useSelector((state) => state.orderDetails)
  const { user } = useSelector((state) => state.user)
  // const { user } = useSelector((state) => state.s)
  const [orderStatus, setOrderStatus] = useState('')
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch()
  const alert = useAlert()
  let cost = 0
  console.log(order)

  //   console.log(order)
  // setOrderStatus(order.orderStatus)

  // order.orderItems.map((i) => (cost += i.price))

  //   console.log(cost)
  useEffect(() => {
    // if (error) {
    //   alert.error(error)
    //   dispatch(clearErrors())
    // }
    dispatch(getOrderDetails(id))
    if (!user) dispatch(loadUser())
  }, [dispatch, id])

  useEffect(() => {
    if (order && order._id !== id) {
      dispatch(getOrderDetails(id))
    } else {
      setOrderStatus(order.orderStatus)
    }
  }, [dispatch, id, order])
  const updateOrderhandle = () => {
    // setOrderStatus(e)
    dispatch(updateOrder(id, orderStatus))

    navigate('/dashboard')
  }
  // const address = order.createdAt.slice(0, 10)
  return (
    <Container>
      <MetaData title={`'Order Details ${id} -- WorthIT'`} />
      <Heading>OrderID #{id}</Heading>
      <Wrapper>
        <Left>
          <Heading>Shipping Details</Heading>
          <Address>
            <p>
              Name:
              <span>{user.name}</span>
            </p>
            <p>
              Email :<span>{user.email}</span>
            </p>
            <p>
              Mobile Number : <span>{order.phoneNo}</span>
            </p>
            <p>
              {/* Ordered On : <span>{order.createdAt.slice(0, 10)}</span> */}
            </p>

            <p>
              Address :<span>{order.address}</span>
            </p>
          </Address>

          <Item>
            <Heading>Items</Heading>
            {order.orderItems &&
              order.orderItems.map((i) => (
                <Info>
                  <Image src={i.image} />
                  <Title>{i.name}</Title>
                  <Price>₹{i.price}</Price>
                </Info>
              ))}
          </Item>
        </Left>
        <Right>
          <Info>
            <p>
              If you have received your product please update order status to
              received
            </p>
            <Select
              onChange={(event) => setOrderStatus(event.target.value)}
              style={{ width: '100%', margin: '5px' }}
              value={orderStatus}
            >
              <MenuItem value='processing'>Processing</MenuItem>
              <MenuItem value='delivered'>delivered</MenuItem>
            </Select>
            <Button onClick={() => updateOrderhandle()}>
              Update Order Status
            </Button>
          </Info>
          <SummaryTitle>ORDER SUMMARY</SummaryTitle>
          <SummaryItem>
            <SummaryText>Total Product : </SummaryText>
            {/* <SummaryPrice>{orders.orderItems.length}</SummaryPrice> */}
          </SummaryItem>
          <SummaryItem>
            <SummaryText>Price : </SummaryText>
            <SummaryPrice>₹{cost}</SummaryPrice>
          </SummaryItem>
        </Right>
      </Wrapper>
    </Container>
  )
}

export default OrderDetails
