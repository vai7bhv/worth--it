import styled from 'styled-components'
// import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
// import { createProduct } from '../action/productAction'
import { useDispatch, useSelector } from 'react-redux'
// import FileBase64 from 'react-file-base64'
import { useNavigate } from 'react-router-dom'
import { createRequest } from '../action/requestAction'
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
// import imageThree from '../image/imageThree.jpg'
const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  /* font-weight: 900; */
  /* align-items: center;
  justify-content: flex-start; */
`

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  display: flex;
  @media (max-width: 600px) {
    justify-content: flex-start;
    width: 90%;
    display: flex;
    flex-direction: column;

    /* position: fixed; */
  }
`
const Image = styled.img`
  width: 50vw;
  height: 70vh;
  margin-right: 5vw;
  margin-left: 5vw;
  @media (max-width: 600px) {
    /* position: fixed; */
    height: 30vh;
    width: 70vw;
    margin-left: 15vw;
  }
`
const Form = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  /* font-weight: 900; */
  -webkit-box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
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
    margin-left: 30vw;
    font-size: 24px;
    /* position: fixed; */
  }
  /* font-weight: 900; */
`
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  /* font-weight: 900; */
`

const RequestItem = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')

  const [description, setDescription] = useState('')
  const { user } = useSelector((state) => state.user)
  // const myForm = new FormData()

  // myForm.set('name', name)
  // myForm.set('price', price)
  // myForm.set('description', description)
  // myForm.set('category', category)
  // console.log(myForm.get(name))
  useEffect(() => {
    setUserName(user.name)
    setEmail(user.email)
  }, [])

  const reqHandleUp = () => {
    console.log(name)
    console.log(description)
    dispatch(createRequest(name, description, userName, email))
    navigate('/requests')
  }
  return (
    <Container>
      <MetaData title='Request Item -- WorthIT' />
      <Wrapper>
        <Image src='https://res.cloudinary.com/djplzfrk5/image/upload/v1646322127/form/request_nw2pnw.png' />
        <Form>
          <Title>Request Item</Title>
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
            label='Description'
            variant='outlined'
            required
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ margin: '.8vw' }}
          />
          <Button
            variant='contained'
            onClick={() => reqHandleUp()}
            style={{
              width: '100px',
              alignItems: 'left',
              justifyContent: 'center',
              marginLeft: '10vw',
              marginRight: '10vw',
            }}
          >
            SUBMIT
          </Button>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default RequestItem
