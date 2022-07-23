import { Button, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { clearErrors } from '../action/orderAction'
import { forgotPassword } from '../action/userAction'
import MetaData from '../component/MetaData'

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: space-evenly;
`

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  -webkit-box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  height: 50vh;

  @media (max-width: 600px) {
    justify-content: flex-start;
    width: 90%;
    /* position: fixed; */
  }
`

const Form = styled.form`
  display: flex;

  flex-direction: column;
`

const Title = styled.h1`
  font-size: 37px;
  font-weight: 800;
  margin-bottom: 10vh;
  margin-left: 3vw;
  margin-top: 5vh;
`

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
  font-weight: 800;
`

// const Button = styled.button`
//   width: 30%;
//   padding: 15px 20px;
//   color: 'black';
//   font-weight: 900;

//   font-size: 0.8em;
//   margin: 1em;

//   border-radius: 3px;
//   cursor: pointer;
//   margin-bottom: 10px;
// `

const Image = styled.img`
  width: 45vw;
  height: 70vh;
`
const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  font-weight: 900;
`

const ForgotPassword = (e) => {
  // e.preventDefault()
  const [email, setEmail] = useState('')
  const dispatch = useDispatch()
  const alert = useAlert()
  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  )
  const handleReset = () => {
    console.log(email)
    dispatch(forgotPassword(email))
  }
  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }

    if (message) {
      alert.success(message)
    }
  }, [dispatch, error, alert, message])

  return (
    <Container>
      <MetaData title='Forgot Password -- WorthIT' />
      <Image src='/image/forgot.png' />
      <Wrapper>
        <Title>Forgot Password</Title>
        <Form>
          <TextField
            // id='outlined-basic'
            label='Email'
            variant='outlined'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ margin: '.7vw' }}
          />

          <Button
            variant='contained'
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: '30%',
              width: '7vw',
              marginTop: '30px',
            }}
            onClick={() => handleReset()}
          >
            Reset
          </Button>
        </Form>

        {/* <label >New at Worth It?</label> */}
      </Wrapper>
    </Container>
  )
}

export default ForgotPassword
