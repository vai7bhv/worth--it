import {
  FavoriteBorderOutlined,
  ShoppingCartOutlined,
} from '@mui/icons-material'
import { CssBaseline } from '@mui/material'
import React from 'react'
import { useAlert } from 'react-alert'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { addToCart } from '../action/cartAction'

const Info = styled.div`
  width: 100%;
  height: 10%;
  position: absolute;
  opacity: 0;
  /* background-color: rgba(0, 0, 0, 0.1); */
  top: 85%;
  left: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
`
const Container = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  flex: 1;
  width: 60vw;
  height: 55vh;
  min-width: 280px;
  align-items: center;
  justify-content: center;
  padding: 10px;
  /* background-color: #f5fbfd; */
  background-color: #dbd8e3;
  text-decoration: none;
  border-radius: 10px;
  align-items: center;
  position: relative;
  flex-wrap: wrap;
  @media (max-width: 700px) {
    width: 65vw;
    height: 65vh;
    flex-direction: column;
  }

  &:hover ${Info} {
    opacity: 1;
    /* background-color: #f5fbfd; */
  }
  &:hover {
    /* opacity: 1; */
    background-color: #8d99ae;
  }
`

// const Circle = styled.div`
//   width: 200px;
//   height: 200px;
//   border-radius: 50%;
//   background-color: white;
//   position: absolute;
// `
// const Item = styled.div``
const Image = styled.img`
  max-width: 80%;
  max-height: auto;
  cursor: pointer;
  width: 27vw;
  height: 30vh;

  object-fit: contain;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  z-index: 1;
  @media (max-width: 700px) {
    width: 50vw;
    height: 25vh;
    /* object-fit: cover; */
  }
`
// const Title = styled.h3``
// const Icons = styled.div`
//   display: flex;
// `
const Details = styled.div`
  align-items: center;
  justify-content: space-between;
  display: flex;
  background: none;
  object-fit: cover;
`
const Name = styled.h3`
  align-items: center;
  justify-content: center;
  font-weight: 400;
  font-size: 20px;
  background: none;
  margin: 10px;
  text-decoration: none;
  font-family: 'Segoe UI', Tahoma, Verdana, sans-serif;
`
const Icon = styled.div`
  width: 43px;
  height: 43px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`

// const Button = styled.button`
//   color: black;
//   background-color: #9985c4;
//   font-weight: bolder;
//   border: none;
//   position: relative;
//   bottom: 1;
//   cursor: pointer;
//   height: 4vh;
/* ` */
function SingleItem({ item }) {
  const dispatch = useDispatch()
  const alert = useAlert()
  const navigate = useNavigate()

  const addCartHandler = (id) => {
    dispatch(addToCart(id))
    alert.success('Item added to Cart')
  }
  return (
    <Container>
      <CssBaseline />
      <Image
        src={item.images[0].url}
        alt={item.images[0].alt}
        onClick={() => navigate(`/product/${item._id}`)}
      />

      <Details>
        <Name>{item.name}</Name>
        <Name>₹{item.price}</Name>
      </Details>
      <Info>
        <Icon>
          <ShoppingCartOutlined onClick={() => addCartHandler(item._id)} />
        </Icon>
      </Info>
    </Container>
  )
}

export default SingleItem
