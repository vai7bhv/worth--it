import styled from 'styled-components'
import { useEffect, useState } from 'react'
import {
  getProductDetails,
  updateProduct,
  UpdateProduct,
} from '../action/productAction'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { clearErrors } from '../action/orderAction'
import { UPDATE_PRODUCT_RESET } from '../reducers/constant/allConstant'
import { useAlert } from 'react-alert'

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
  font-weight: 400;
  background-color: white;
  @media (max-width: 600px) {
    justify-content: flex-start;
  }
`

const Wrapper = styled.div`
  width: 40%;
  padding: 2vw;
  background-color: #f3f8fb;
  margin: 5vw;
  display: flex;
  margin-top: 5vw;
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
  /* font-weight: 900; */
  ${'' /* -webkit-box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3); */}
  ${'' /* box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3); */}
  border-radius: 10px;
  @media (max-width: 600px) {
    justify-content: flex-start;
    width: 30%;
    & > p {
      font-size: large;
    }

    /* position: fixed; */
  }
  /* font-weight: 900; */
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
`

const PreviewImg = styled.img`
  width: 15vw;
  height: 15vh;
  display: flex;
`
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  /* font-weight: 900; */
`

// const Button = styled.button`
//   width: 20%;
//   padding: 12px 15px;
//   color: 'white';
//   font-size: 17px;
//   margin: 1em;
//   /* font-weight: 900; */
//   border-radius: 3px;
//   cursor: pointer;
// `
const Prv = styled.div`
  display: flex;
  overflow: auto;
`
const Button1 = styled.button`
  width: 10%;
  padding: 5px 7px;
  color: 'white';
  font-size: 12px;
  margin: 1em;
  /* font-weight: 900; */
  border-radius: 3px;
  cursor: pointer;
`
const Image = styled.img`
  width: 40vw;
  height: 80vh;
  margin-top: 3vh;
  margin-right: 0vw;
  margin-left: 10vw;
  @media (max-width: 600px) {
    /* position: fixed; */
    height: 30vh;
    width: 70vw;
    margin-left: 15vw;
  }
`

const UpdateProductDetails = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [images, setImages] = useState([])
  // const [pStatus, setPStatus] = useState("Available")
  const [oldImages, setOldImages] = useState([])
  const [imagesPreview, setImagesPreview] = useState([])
  const [productStatus, setProductStatus] = useState('available')
  // const { register } = useForm()
  const navigate = useNavigate()
  const { id } = useParams()
  const alert = useAlert()
  const categories = [
    'Books',
    'Electronics',
    'Chemical',
    'Mechanical',
    'Civil',
    'Computer',
    'Other',
  ]

  const { error, product } = useSelector((state) => state.productDetails)

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product)
  // const myForm = new FormData()

  // myForm.set('name', name)
  // myForm.set('price', price)
  // myForm.set('description', description)
  // myForm.set('category', category)
  // console.log(myForm.get(name))
  useEffect(() => {
    if (product && product._id !== id) {
      dispatch(getProductDetails(id))
    } else {
      setName(product.name)
      setDescription(product.description)
      setPrice(product.price)
      setCategory(product.category)
      setImages(product.images[0])
      setOldImages(product.images)
      setProductStatus(product.productStatus)
    }
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }

    if (updateError) {
      alert.error(updateError)
      dispatch(clearErrors())
    }

    if (isUpdated) {
      alert.success('Product Updated Successfully')

      navigate('/dashboard')
      dispatch({ type: UPDATE_PRODUCT_RESET })
    }
  }, [dispatch, alert, error, isUpdated, id, product, updateError])

  const handleUp = () => {
    console.log(productStatus)
    dispatch(
      updateProduct(
        id,
        name,
        description,
        price,
        category,
        images,
        productStatus
      )
    )
    navigate('/dashboard')
  }
  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files)

    setImages([])
    setImagesPreview([])
    setOldImages([])

    files.forEach((file) => {
      const reader = new FileReader()

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result])
          setImages((old) => [...old, reader.result])
        }
      }

      reader.readAsDataURL(file)
    })
  }

  return (
    <Container>
      <MetaData title={`Update Products Details  -- WorthIT`} />
      <Image src='https://res.cloudinary.com/djplzfrk5/image/upload/v1646398082/form/Update_Item_brxdfh.png' />
      <Wrapper>
        <Form>
          <Title>Update Item</Title>
          <TextField
            // id='outlined-basic'
            label='Name'
            variant='outlined'
            required
            autowidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ margin: '.7vw', width: '80%' }}
          />
          <TextField
            // id='outlined-basic'
            label='Description'
            variant='outlined'
            required
            multiline
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ margin: '.7vw', width: '80%' }}
          />
          <Select
            onChange={(event) => setCategory(event.target.value)}
            style={{ width: '80%', margin: '5px' }}
            value={category}
          >
            {categories.map((c) => (
              <MenuItem value={c}>{c}</MenuItem>
            ))}
          </Select>
          <TextField
            // id='outlined-basic'
            label='Price'
            variant='outlined'
            type='number'
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{ margin: '.7vw', width: '80%' }}
          />
          <Select
            onChange={(event) => setProductStatus(event.target.value)}
            style={{ width: '80%', margin: '5px' }}
            value={productStatus}
          >
            <MenuItem value='available'>Available</MenuItem>
            <MenuItem value='delivered'>Delivered</MenuItem>
          </Select>
          {/* <Input
            type='file'
            name='avatar'
            accept='image/*'
            onChange={updateProductImagesChange}
            multiple
          /> */}
          <p
            style={{
              color: 'gray',
              fontSize: '15px',
              width: '80%',
              margin: '10px',
            }}
          >
            If you have Delivered your product Please change Product status from
            Available to Delivered
          </p>

          <Prv>
            {oldImages &&
              oldImages.map((image, index) => (
                <PreviewImg
                  key={index}
                  src={image.url}
                  alt='Old Product Preview'
                />
              ))}
          </Prv>
          <Prv>
            {imagesPreview.map((image, index) => (
              <PreviewImg key={index} src={image} alt='Product Preview' />
            ))}
          </Prv>

          <Button
            variant='contained'
            onClick={() => handleUp()}
            style={{
              width: '100px',
              alignItems: 'left',
              justifyContent: 'center',
              marginTop: '5vw',
              marginLeft: '15vw',
              marginRight: '20vw',
            }}
          >
            Update
          </Button>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default UpdateProductDetails
