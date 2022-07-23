import { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { clearError, registerUserAction } from '../action/userAction'
import TextField from '@mui/material/TextField'
import {
  Button,
  CssBaseline,
  InputLabel,
  Menu,
  MenuItem,
  Select,
} from '@mui/material'
import MetaData from '../component/MetaData'

const Container = styled.div`
  width: 100vw;
  min-height: 80vh;
  /* background: url('./Mobile-login.jpg') left center; */
  /* background-image: ; */
  display: flex;
  align-items: center;
  justify-content: center;
  /* margin-top: 10px; */

  font-weight: 400;
  background-color: #e7e8e9;

  @media (max-width: 600px) {
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
  }
`

const Wrapper = styled.div`
  width: 36%;
  padding: 2vw;
  background-color: #f3f8fb;

  margin: 5vw;
  -webkit-box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  @media (max-width: 600px) {
    justify-content: flex-start;
    width: 90%;
    /* position: fixed; */
  }
`

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  font-weight: 400;
  margin: 30px;
`

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;

  color: #252a2a;
`

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  font-weight: 900;
`

const Agreement = styled.span`
  font-size: 14px;
  margin: 20px 0px;
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
const Link = styled.a`
  margin: 5px 0px;
  font-size: 16px;
  text-decoration: underline;
  cursor: pointer;
  font-weight: 600;
  margin-left: 3px;
  color: #343742;
`
const LoginOp = styled.div``
const Avatar = styled.div`
  display: flex;
  padding: 0%;
`
const Image = styled.img`
  cursor: pointer;
  width: 40vw;
  height: 40vw;
  /* z-index: 2; */
  /* height: 5vh; */
  border: none;
  margin: 0%;
  font: 400 0.8vmax;
  transition: all 0.5s;
  /* padding: 1vmax; */
  border-radius: 10px;
  color: rgba(0, 0, 0, 0.623);
  background-color: rgb(255, 255, 255);
  @media (max-width: 700px) {
    width: 75%;
    height: 30vh;
    margin-top: 20px;
  }
`

const Signup = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [avatar, setAvatar] = useState('./profile.png')
  const [avatarPreview, setAvatarPreview] = useState('./profile.png')
  const [dep, setDep] = useState('')

  const alert = useAlert()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { error, isAuthUser } = useSelector((state) => state.user)
  // const { isAuthUserReg } = useSelector((state) => state.registerUser)
  if (isAuthUser) navigate('/')
  const handleSignup = (e) => {
    e.preventDefault()

    if (password === confirmPassword) {
      dispatch(registerUserAction(name, email, password, avatar))
      if (!error) navigate('/')

      if (!email) alert.error('Invalid email')
      if (!name) alert.error('Invalid name')
    } else {
      setPassword('')
      setConfirmPassword('')
      alert.error('password not matched')
    }
  }

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearError())
    }
    if (isAuthUser) navigate('/')
    // if (isAuthUserReg) navigate('/')
  }, [isAuthUser, error, alert, dispatch])
  // const registerDataChange = (e) => {
  //   if (e.target.name === 'avatar') {
  //     const reader = new FileReader()

  //     reader.onload = () => {
  //       if (reader.readyState === 2) {
  //         setAvatarPreview(reader.result)
  //         setAvatar(reader.result)
  //       }
  //     }

  //     reader.readAsDataURL(e.target.files[0])
  //   }
  // }
  // console.log(name)
  const department = [
    'IT',
    'Computer',
    'Civil',
    'IC',
    'EC',
    'Mechanical',
    'Chemical',
    'Other',
  ]

  return (
    <Container>
      <CssBaseline />
      <MetaData title='Signup -- WorthIT' />
      <Image src='./Mobile-login.jpg' />
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <TextField
            // id='outlined-basic'
            label='Name'
            variant='outlined'
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ margin: '.7vw' }}
          />
          <TextField
            // id='outlined-basic'
            label='email'
            type='email'
            variant='outlined'
            required
            value={email}
            color='primary'
            onChange={(e) => setEmail(e.target.value)}
            style={{ margin: '.7vw' }}
          />
          <TextField
            // id='outlined-basic'
            label='password'
            variant='outlined'
            required
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ margin: '.7vw' }}
          />
          <TextField
            // id='outlined-basic'
            label='Confirm Password'
            variant='outlined'
            required
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ margin: '.7vw' }}
          />
        </Form>
        <Agreement>
          By creating an account I consent to the processing of my personal data
          in accordance with the
          <Link>PRIVACY POLICY</Link>
          <br />
        </Agreement>
        <LoginOp>
          <h3
            style={{
              fontWeight: 700,
              color: '#5D5F65',
            }}
          >
            Already have an account
          </h3>
          <Link onClick={() => navigate('/Login')}>Login</Link>
        </LoginOp>
        <Button
          variant='contained'
          onClick={(e) => handleSignup(e)}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: '30%',
          }}
        >
          SIGN UP
        </Button>
      </Wrapper>
    </Container>
  )
}

export default Signup
