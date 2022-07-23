import { CalendarToday, Dns, HomeOutlined, Phone } from '@mui/icons-material'
import { Button, TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { saveShippingInfo } from '../action/cartAction'
import MetaData from '../component/MetaData'

const Container = styled.div`
  width: 100vw;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 600px) {
    justify-content: flex-start;
    width: 90%;
    flex-direction: column;
  }
`
const Image = styled.img`
  width: 50vw;
  height: auto;
`
const Title = styled.h1`
  font-size: 2.5vw;
  margin: 20px;
  @media (max-width: 600px) {
    font-size: 25px;
    /* position: fixed; */
  }
`
const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: auto;
  padding: 2vmax;
  justify-content: center;
  height: 80%;
  transition: all 0.5s;
  -webkit-box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  @media (max-width: 600px) {
    width: 80vw;
    margin-left: 10vw;
    justify-content: center;
    /* position: fixed; */
  }
`
const Item = styled.div`
  padding: 1vmax 4vmax;
  padding-right: 1vmax;
  width: 100%;
`
const Icon = styled.div`
  /* position: absolute; */
  transform: translateX(1vmax);
  font-size: 1.6vmax;
  color: rgba(0, 0, 0, 0.623);
`
const Input = styled.input`
  padding: 1vmax 4vmax;
  padding-right: 1vmax;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.267);
  border-radius: 4px;
  font-weight: 900;
  outline: none;
`

function Shipping() {
  const dispatch = useDispatch()
  const alert = useAlert()
  const navigate = useNavigate()

  const { shippingInfo } = useSelector((state) => state.cart)
  const [address, setAddress] = useState(shippingInfo.address)
  const [mobileNo, setMobileNo] = useState(shippingInfo.mobileNo)
  const [department, setDepartment] = useState(shippingInfo.department)
  const [sem, setSem] = useState(shippingInfo.sem)

  const shippingSubmit = () => {
    // e.preventDefault()

    if (mobileNo.length < 10 || mobileNo.length > 10) {
      alert.error('Phone Number should be 10 digits Long')
      return
    }
    dispatch(saveShippingInfo({ address, mobileNo, department, sem }))
    navigate('/order/confirm')
  }
  return (
    <Container>
      <MetaData title='Shipping Information -- WorthIT' />
      <Image src='/image/Address-cuate.png' />
      <Form>
        <Title>Shipping Details</Title>
        <Item>
          <TextField
            type='text'
            variant='outlined'
            label='address'
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Item>
        <Item>
          <TextField
            type='text'
            variant='outlined'
            label='mobile Number'
            required
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
          />
        </Item>
        <Item>
          <TextField
            type='text'
            variant='outlined'
            label='department'
            required
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
        </Item>
        <Item>
          <TextField
            type='text'
            variant='outlined'
            label='semester'
            required
            value={sem}
            onChange={(e) => setSem(e.target.value)}
          />
        </Item>
        <Button
          variant='contained'
          onClick={() => shippingSubmit()}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            // marginLeft: '30%',
            width: '90px',
          }}
        >
          Confirm
        </Button>
      </Form>
    </Container>
  )
}

export default Shipping
