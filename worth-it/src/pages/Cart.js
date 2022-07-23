import { RemoveCircleOutline } from '@mui/icons-material'
import { Link, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { removeCartItem } from '../action/cartAction'
import MetaData from '../component/MetaData'

const Container = styled.div`
  min-height: 90vh;
  /* background-color: #e7e8e9; */

  @media (max-width: 600px) {
    justify-content: flex-start;
  }
`
const Wrapper = styled.div`
  padding: 20px;
  text-align: center;
`
const Title = styled.h1`
  font-weight: 600;
`
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Btn = styled.button`
  font-weight: 400;
  color: #ecb474;
  padding: 8px;
  justify-content: space-between;
  margin: 5px;
  border: 2px solid gray;
  cursor: pointer;
  background-color: #4e4c50;
`
const Bottom = styled.div`
  display: flex;
  justify-content: space-around;
  @media (max-width: 600px) {
    justify-content: flex-start;

    display: flex;
    flex-direction: column;

    /* position: fixed; */
  }
`
const Info = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`

const ProductDetails = styled.div`
  display: flex;
  margin: 20px;
  margin-left: 20px;
  /* justify-content: space-between; */
`
const Image = styled.img`
  width: 22vw;
  height: 25vh;
  cursor: pointer;
  object-fit: contain;
`
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`
const Name = styled.h3`
  font-size: ${(props) => props.name === 'seller' && '13px'};
  font-weight: 400;
`
const Price = styled.span`
  font-weight: 200;
  /* font-family: Arial, Helvetica, sans-serif; */
  font-size: larger;
`

const Summary = styled.div`
  flex: 1;
  border: 1px solid gray;
  border-radius: 10px;
  margin: 10px;
  margin-left: 20px;
  padding: 20px;
  height: 50vh;
  font-weight: 400;
  max-width: 25vw;
  height: 40vh;
  @media (max-width: 600px) {
    justify-content: flex-end;
    max-width: 80vw;
  }
`

const SummaryTitle = styled.h2`
  font-weight: 400;
`
const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
`
const SummaryText = styled.div``
const SummaryPrice = styled.div``
const Product = styled.div`
  background-color: rgb(51, 51, 51);
  color: white;
  font-weight: 400;
  font-size: 1.4vmax;
  margin: 1vmax;
  padding: 1vmax 3vmax;
  cursor: pointer;
  text-decoration: none;
  border-radius: 1vmax;
`
const EmptyCart = styled.div`
  margin: auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 50vh;
  padding: 10vmax;
`

function Cart({}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { cartItems } = useSelector((state) => state.cart)
  const { user } = useSelector((state) => state.user)
  let cost = 0

  cartItems.map((i) => (cost += i.price))

  const removeItem = (id) => {
    // e.preventDefault()
    dispatch(removeCartItem(id))
  }

  // const socket = io('http://localhost:5000')

  // const receiveNotification = () => {
  //   console.log('rcvCLicked')
  //   socket.on('getNotification', (data) => {
  //     setNotification(data)
  //   })
  // const data = {
  //   to_name: user.name,
  //   from_name: user,
  // }
  // const sendEmail = (e) => {
  //   e.preventDefault()
  //   emailjs
  //     .sendForm(
  //       'service_qfkn687',
  //       'template_tiwde1d',

  //       'user_lmYx5RWozPhPcGqXPgyOn'
  //     )
  //     .then(
  //       (result) => {
  //         console.log(result.text)
  //       },
  //       (error) => {
  //         console.log(error.text)
  //       }
  //     )
  // }
  return (
    <Container>
      <MetaData title='Cart     -- WorthIT' />
      {/* <button onClick={(e) => sendEmail(e)}> email</button> */}
      {cartItems.length === 0 ? (
        <EmptyCart>
          <Typography style={{ fontSize: '3vmax' }}>
            No Product in Your Cart
          </Typography>
          <Product onClick={() => navigate('/products')}>View Products</Product>
        </EmptyCart>
      ) : (
        <Wrapper>
          <Title>Cart</Title>

          <Bottom>
            <Info>
              {cartItems.map((item) => (
                <ProductDetails>
                  <Image
                    src={item.image}
                    onClick={() => navigate(`/product/${item.product}`)}
                  />
                  <Details>
                    <Name>{item.name}</Name>
                    <Name name='seller'>From : {item.SellerName}</Name>
                    <Price>₹{item.price}</Price>
                    <Tooltip title='Remove Item'>
                      <RemoveCircleOutline
                        style={{ cursor: 'pointer', color: '#2c2c2c' }}
                        onClick={() => removeItem(item.product)}
                      />
                    </Tooltip>
                  </Details>
                </ProductDetails>
              ))}
            </Info>
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryText>Product : </SummaryText>
                <SummaryPrice>{cartItems.length}</SummaryPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryText>Price : </SummaryText>
                <SummaryPrice>₹{cost}</SummaryPrice>
              </SummaryItem>

              <Btn onClick={() => navigate('/login?redirect=shipping')}>
                CHECK OUT
              </Btn>
            </Summary>
          </Bottom>
        </Wrapper>
      )}
    </Container>
  )
}

export default Cart
