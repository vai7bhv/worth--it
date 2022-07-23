import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { clearErrors, createOrder } from '../action/orderAction'
import emailjs from 'emailjs-com'
import axios from 'axios'
import MetaData from '../component/MetaData'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: 80vh;
  @media (max-width: 700px) {
    width: 90%;
    flex-direction: column;
  }
`
const Info = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px;
  margin-top: 2vh;
  align-items: center;
  /* justify-content: center; */
`

const Heading = styled.h2`
  margin-top: 2vh;
  margin-left: 2vh;
  font-weight: 600;
`
const Left = styled.div`
  margin-left: 10px;
`
const Address = styled.div`
  margin-top: 3vh;
  margin-bottom: 2vh;
  margin-left: 2vw;
  font-weight: 300;
`
const Item = styled.div``
const Image = styled.img`
  width: 10vw;
  height: 15vh;
  cursor: pointer;
  object-fit: contain;
  @media (max-width: 700px) {
    width: 15vw;
    height: 20vh;
  }
`
const Title = styled.h3`
  margin: 5px;
  font-weight: 400;
  max-width: 20vw;

  @media (max-width: 700px) {
    font-size: 15px;
    margin-left: 10px;
    /* margin-top: 20px; */
  }
`
const Price = styled.h4`
  margin: 1vw;
  font-weight: 300;
  align-items: center;
  justify-content: center;
  @media (max-width: 700px) {
    font-size: 15px;
    margin-left: 10px;
  }
`
const Right = styled.div`
  flex: 1;
  border: 1px solid gray;
  border-radius: 10px;
  margin: 10px;
  margin-left: 20px;
  padding: 20px;
  height: 50vh;
  font-weight: bolder;
  max-width: 25vw;
  height: 40vh;
  margin-right: 50px;
  @media (max-width: 700px) {
    max-width: 80%;
    margin-right: 5px;
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
const Button = styled.button`
  font-weight: 400;
  padding: 8px;
  justify-content: center;
  align-items: center;
  margin-left: 20vw;
  margin: 5px;
  border: none;
  /* border: 2px solid blue; */

  cursor: pointer;

  background-color: lightsteelblue;
`
const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart)
  const { user } = useSelector((state) => state.user)
  const { error } = useSelector((state) => state.newOrder)

  const navigate = useNavigate()
  const alert = useAlert()
  const dispatch = useDispatch()
  // const [email, setEmail] = useState([])
  // const [socket, setSocket] = useState(null)

  let cost = 0

  cartItems.map((i) => (cost += i.price))

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
  }, [dispatch, error, alert])

  const order = {
    name: user,
    orderItems: cartItems,
    phoneNo: shippingInfo.mobileNo,
    address: shippingInfo.address,

    // image: cartItems.image,
    totalPrice: cost,
  }
  // useEffect(() => {

  // }, [socket])

  // console.log(email)
  let email
  let subject
  let message

  const placeOrder = async () => {
    cartItems.map(
      (i) => (
        ((email = i.SellerEmail),
        (message = `Hello from WorthIT Your Product ${i.name} is Bought by ${user.name} .
        
                          Buyer Details 
        
         Buyer Email :  ${user.email}
         Buyer name:  ${user.name}
         Buyer Mobile No. : ${shippingInfo.mobileNo}
         Buyer Address : ${shippingInfo.address}
         Buyer semester : ${shippingInfo.sem}
         Buyer department : ${shippingInfo.department}


         Thank you for using WorthIT. 


         Thank you 
         WorthIT
          `),
        (subject = `
        WorthIT notification 
        `)),
        axios.post('/api/confirmEmail', {
          email,
          subject,
          message,
        })
      )
    )

    dispatch(createOrder(order))

    alert.success('Order Placed Successfully ')
    setTimeout(() => {
      // console.log('World!')
    }, 1000)
    navigate('/dashboard')
  }
  // const Cmsg = ``
  // const receiver = `${cartItems[0].SellerEmail}`
  // console.log(Cmsg)

  emailjs.init('user_lmYx5RWozPhPcGqXPgyOn')

  return (
    <Container>
      <MetaData title='Confirm Order -- WorthIT' />
      <Left>
        <Heading>Shipping Details</Heading>
        <Address>
          <p>
            Name : <span>{user.name}</span>
          </p>
          <p>
            Email : <span>{user.email}</span>
          </p>
          <p>
            Mobile No. : <span>{shippingInfo.mobileNo}</span>
          </p>
          <p>
            Address : <span>{shippingInfo.address}</span>
          </p>
        </Address>
        <Item>
          <Heading>Items</Heading>
          {cartItems &&
            cartItems.map((i) => (
              <Info>
                <Image src={i.image} />
                <Title>{i.name}</Title>
                <Price>₹{i.price}</Price>
              </Info>
            ))}
        </Item>
      </Left>
      <Right>
        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
        <SummaryItem>
          <SummaryText>Product : </SummaryText>
          <SummaryPrice>{cartItems.length}</SummaryPrice>
        </SummaryItem>
        <SummaryItem>
          <SummaryText>Price : </SummaryText>
          <SummaryPrice>₹{cost}</SummaryPrice>
        </SummaryItem>
        <Button onClick={() => placeOrder()}>Place Order</Button>
      </Right>
    </Container>
  )
}

export default ConfirmOrder
