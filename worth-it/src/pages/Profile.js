import React, { useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { logout } from '../action/userAction'
import { Button, TextField } from '@mui/material'
import MetaData from '../component/MetaData'
const Container = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  min-height: 80vh;
  -webkit-box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  width: 90vw;
  margin-left: 5vw;
  background-color: aliceblue;
  /* margin-left: 10vw; */
  /* background-image: linear-gradient(to top, #96fbc4 0%, #f9f586 100%); */
  align-items: center;
  justify-content: center;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px,
    rgba(0, 0, 0, 0.1) 0px 2px 4px 0px,
    rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
  @media (max-width: 700px) {
    font-size: 15px;
  }
`
const Left = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Heading = styled.h1`
  /* color: rgba(255, , 255, 0.7); */
  transform: translateX() (-10vmax) translateY(-2vmax);
  margin: 1vmax;
`

const Btn = styled.div`
  font: 900 2.5vmax;
  color: #191a1a;
  /* background-color: rgb(30, 30, 30); */
  background-color: #508ce8;
  padding: 1vmax;

  margin: 2vmax;
  font-weight: 900;
  text-align: center;
  cursor: pointer;
  transition: all 0.5s;
  border-radius: 15px;

  &:hover {
    color: #282d32;
    transform: rotate(4deg);
    background-color: #3274da;
  }
`

const Right = styled.div`
  display: flex;
  flex-direction: column;
  height: 90vh;
  width: 100vw;
  max-width: 100%;
  /* justify-content: center; */
  align-items: center;
  /* box-sizing: border-box; */
`
const About = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`
const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1vmax;
`
const Name = styled.h4`
  color: black;
  font: 900 1.2vmax;
`
const Field = styled.p`
  font-weight: 500;
  color: rgba(0, 0, 0, 10);
`
const TwoBtn = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 600px) {
    flex-direction: column;
    flex-wrap: nowrap;
  }
`
// const Btn = styled.div`
//   font: 900 2.5vmax;
//   color: white;
//   background-color: black;
//   padding: 1vmax;
//   width: 30%;
//   margin: 2vmax;
//   text-align: center;
//   cursor: pointer;
//   transition: all 0.5s;
// `

function Profile() {
  const navigate = useNavigate()
  const alert = useAlert()
  const dispatch = useDispatch()
  const { user, isAuthUser } = useSelector((state) => state.user)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
    alert.success('Logout Successfully')
  }

  useEffect(() => {
    if (!isAuthUser) navigate('/login')
  }, [isAuthUser])
  return (
    <Container>
      <MetaData title={`${user.name}'s profile -- WorthIT`} />
      <Left>
        <Heading>{user.name}'s profile</Heading>
      </Left>
      <Right>
        <About>
          <Info>
            <Name>Full Name</Name>
            <Field>{user.name}</Field>
          </Info>
          <Info>
            <Name>Email</Name>
            <Field>{user.email}</Field>
          </Info>
          {user.sem && (
            <Info>
              <Name>Sem</Name>
              <Field>{user.sem}</Field>
            </Info>
          )}
          {user.department && (
            <Info>
              <Name>Department</Name>
              <Field>{user.department}</Field>
            </Info>
          )}
          {user.mobileNo && (
            <Info>
              <Name>MobileNo</Name>
              <Field>{user.mobileNo}</Field>
            </Info>
          )}
          {user.address && (
            <Info>
              <Name>Address</Name>
              <Field>{user.address}</Field>
            </Info>
          )}
        </About>

        <TwoBtn>
          {user.role === 'admin' && (
            <Btn onClick={() => navigate('/admin/products')}>
              Admin dashboard
            </Btn>
          )}

          <Btn onClick={() => navigate('/dashboard')}>dashboard</Btn>
          <Btn onClick={() => navigate('/requestItem')}>request</Btn>

          <Btn onClick={() => navigate('/profile/update')}>Edit Profile</Btn>

          <Btn onClick={() => navigate('/password/update')}>
            update Password
          </Btn>
          <Btn onClick={() => handleLogout()}>Logout</Btn>
          <Btn onClick={() => navigate('/addItem')}>AddItem</Btn>
        </TwoBtn>
      </Right>
    </Container>
  )
}

export default Profile
