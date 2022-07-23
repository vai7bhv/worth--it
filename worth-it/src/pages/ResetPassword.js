import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { resetPassword } from '../action/userAction'
import MetaData from '../component/MetaData'

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: space-evenly;
  @media (max-width: 600px) {
    justify-content: flex-start;
    width: 90%;
    flex-direction: column;
    /* position: fixed; */
  }
`

const Wrapper = styled.div`
  /* width: ; */
  padding: 20px;
  background-color: white;
  -webkit-box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  justify-content: center;
  @media (max-width: 600px) {
    /* justify-content: flex-start; */
    width: 90%;
    /* position: fixed; */
  }
`

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`

const Title = styled.h1`
  font-size: 35px;
  font-weight: 700;
  margin-left: 6vw;
  margin-bottom: 2vw;
  margin-top: 2vw;
`

const Image = styled.img`
  width: 45vw;
  height: 70vh;
  @media (max-width: 600px) {
    width: 60vw;
    height: 40vh;
    /* position: fixed; */
  }
`

function ResetPassword() {
  const dispatch = useDispatch()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { token } = useParams()
  const navigate = useNavigate()
  const alert = useAlert()
  const { success, error } = useSelector((s) => s.forgotPassword)
  const handleReset = () => {
    dispatch(resetPassword(password, confirmPassword, token))
  }

  useEffect(() => {
    if (success) navigate('/profile')
    if (error) alert.error(error)
  }, [success, error, navigate, alert])
  return (
    <Container>
      <MetaData title='Reset password -- WorthIT' />
      <Image src='/image/resetpassword.png' />
      <Wrapper>
        <Title>Reset Password</Title>
        <Form>
          <TextField
            id='outlined-basic'
            label='New Password'
            variant='outlined'
            required
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ margin: '.7vw' }}
          />

          <TextField
            id='outlined-basic'
            label='Confirm Password'
            variant='outlined'
            required
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ margin: '.7vw' }}
          />

          <Button
            variant='contained'
            onClick={(e) => handleReset(e)}
            style={{
              width: '100px',
              alignItems: 'left',
              justifyContent: 'center',
              marginTop: '2vw',
              marginLeft: '16vw',
              marginRight: '15vw',
            }}
          >
            Reset
          </Button>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default ResetPassword
