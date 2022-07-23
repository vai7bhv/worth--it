// import '../App.css'
import React from 'react'
// import { MailOutline, RedeemRounded } from '@mui/icons-material'
// import Loader from './Loader/Loader'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate, Link, Navigate } from 'react-router-dom'
import styled from 'styled-components'
// import { clearError, updatePassword } from '../action/userAction'
import { updatePassword, updateProfile } from '../action/userAction'
import { useAlert } from 'react-alert'
import { UPDATE_PASSWORD_RESET } from '../reducers/constant/allConstant'

import {
  Button,
  ButtonBase,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import MetaData from '../component/MetaData'

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  background-color: #e7e8e9;
  @media (max-width: 600px) {
    justify-content: flex-start;
    flex-direction: column;
  }
`

const Wrapper = styled.div`
  width: 40%;
  padding: 2vw;
  background-color: #f3f8fb;
  margin: 10vw;
  display: flex;
  flex-direction: column;
  -webkit-box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  @media (max-width: 600px) {
    justify-content: flex-start;
    width: 80%;
    /* position: fixed; */
  }
`

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  /* font-weight: 900; */

  border-radius: 10px;
  @media (max-width: 600px) {
    justify-content: flex-start;
    width: 40%;
    & > p {
      font-size: large;
    }

    /* position: fixed; */
  }
`
const Title = styled.h1`
  font-size: 30px;
  margin-left: 5vw;
  margin-top: 20px;
  margin-bottom: 20px;
  @media (max-width: 600px) {
    margin: 10px;
    margin-left: 10vw;
    font-size: 24px;

    /* position: fixed; */
  }
`

// const Button = styled.button`
//   width: 20%;
//   padding: 15px 20px;
//   color: 'white';

//   font-size: 0.8em;
//   margin: 1em;

//   border-radius: 3px;
//   cursor: pointer;
// `
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 5px 10px 0px 0px;
  padding: 10px;
  font-weight: 900;
`
const Image = styled.img`
  width: 40vw;
  height: 70vh;
  @media (max-width: 700px) {
    width: 80vw;
    height: 40vh;
  }
`

const UpdatePassword = () => {
  const { user } = useSelector((state) => state.user)
  const navigate = useNavigate()

  const { error, isUpdated } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const alert = useAlert()
  // const [avatar, setAvatar] = useState();

  const [oldPassword, setOldPassword] = useState('')

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const updatePasswordSubmit = (e) => {
    e.preventDefault()

    dispatch(updatePassword(oldPassword, newPassword, confirmPassword))
  }

  useEffect(() => {
    if (error) {
      alert.error(error)
    }
    if (isUpdated) {
      alert.success('Password Updated Successfully')

      navigate('/profile')
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      })
    }
  }, [dispatch, error, alert, isUpdated])
  return (
    <Container>
      <MetaData title='Update password -- WorthIT' />
      <Image src='/image/resetpassword.png' />
      <Wrapper>
        <Title>Change Password</Title>
        <Form>
          <TextField
            id='outlined-basic'
            label='Old Password'
            variant='outlined'
            required
            type='password'
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            style={{ margin: '.7vw' }}
          />

          <TextField
            id='outlined-basic'
            label='New Password'
            variant='outlined'
            required
            type='password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={{ margin: '.7vw' }}
          />

          <TextField
            id='outlined-basic'
            label='Confirm Ppassword'
            variant='outlined'
            required
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ margin: '.7vw' }}
          />

          <Button
            variant='contained'
            onClick={(e) => updatePasswordSubmit(e)}
            style={{
              width: '100px',
              alignItems: 'left',
              justifyContent: 'center',
              marginTop: '2vw',
              marginLeft: '16vw',
              marginRight: '15vw',
            }}
          >
            Update
          </Button>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default UpdatePassword
