import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { clearError, login } from '../action/userAction'
import { useAlert } from 'react-alert'
import { Button, TextField } from '@mui/material'
import MetaData from '../component/MetaData'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 10px;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  background-color: #e7e8e9;
  /* padding-top: 10px; */
  @media (max-width: 600px) {
    justify-content: flex-start;
  }
`

const Wrapper = styled.div`
  width: 25%;
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
    width: 90%;
    /* position: fixed; */
  }
`

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  font-weight: 400;
  margin-top: 30px;
  margin-right: 30px;
  margin-left: 30px;
  margin-bottom: 10px;
`

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #252a2a;
`

const Link = styled.a`
  /* margin: 5px 0px; */
  font-size: 15px;
  text-decoration: underline;
  cursor: pointer;
  font-weight: 600;
  margin-left: 3px;
  color: #343742;
  justify-content: flex-end;
`
const Option = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;

  font-size: 18px;
`
const Op = styled.div`
  display: flex;
  flex-direction: column;
`

const Login = () => {
  const alert = useAlert()
  const location = useLocation()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { loading, error, isAuthUser } = useSelector((state) => state.user)
  const navigate = useNavigate()

  const link = location.search ? location.search.split('=')[1] : '/profile'
  // console.log(link)
  // const [user, setUser] = useState({})
  // console.log(email)
  // console.log(password)
  const handleLogin = (e) => {
    e.preventDefault()
    // console.log(e)
    dispatch(login(email, password))

    // alert.success('Logged in Successfully')
  }

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearError())
    }

    if (isAuthUser) {
      navigate(link)
    }
  }, [isAuthUser, dispatch, navigate, error, link, alert])

  return (
    <Container>
      <MetaData title='Login -- WorthIT' />
      <Wrapper>
        <Title>LOG IN</Title>
        <Form>
          <TextField
            id='outlined-basic'
            label='Email'
            type='email'
            variant='outlined'
            required
            value={email}
            color='primary'
            onChange={(e) => setEmail(e.target.value)}
            style={{ margin: '.7vw' }}
          />
          <TextField
            id='outlined-basic'
            label='Password'
            variant='outlined'
            required
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ margin: '.7vw' }}
          />
        </Form>
        <Button
          type='submit'
          variant='contained'
          onClick={(e) => handleLogin(e)}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: '30%',
            width: '20px',
          }}
        >
          LOGIN
        </Button>
        <Option>
          <Link
            style={{ marginTop: '10px' }}
            onClick={() => navigate('/forgotPassword')}
          >
            FORGOT PASSWORD?
          </Link>
          <Op>
            <label>
              New at <b>WorthIT</b>?
            </label>
            <Link onClick={() => navigate('/signup')}>CREATE AN ACCOUNT</Link>
          </Op>
        </Option>
      </Wrapper>
    </Container>
  )
}

export default Login
