import React, { useEffect, useState } from 'react'
import {
  FavoriteBorderOutlined,
  ShoppingCartOutlined,
} from '@mui/icons-material'
import styled from 'styled-components'
import SingleItem from '../component/SingleItem'
import { useDispatch, useSelector } from 'react-redux'
import {
  getProduct,
  getProductDetails,
  getProductImages,
} from '../action/productAction'
import { useParams } from 'react-router-dom'
import '../data'
import { addToCart } from '../action/cartAction'
import { useAlert } from 'react-alert'
import { Backdrop, Fade, Modal, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Button } from '@mui/material'
import MetaData from '../component/MetaData'

const Container = styled.div`
  /* background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url(https://imgstaticcontent.lbb.in/lbbnew/wp-content/uploads/2017/09/13204610/13092017_Books_02.jpghttps://res.cloudinary.com/djplzfrk5/image/upload/v1646298874/BackGround/Flipping-books_mg29wj.jpg)
      center; */
  display: flex;
  flex-direction: column;
  background-color: #f2f2f2;
`

const Wrapper = styled.div`
  padding: 50px;
  margin-left: 5vw;
  background-color: #f3f8fb;
  margin-top: 3vw;

  display: flex;
  -webkit-box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  box-sizing: border-box;
  max-width: 90%;
  height: auto;
  /* border: solid #ffffff 10px; */

  /* padding: 5px; */
  @media (max-width: 700px) {
    flex-direction: column;
    align-items: center;
    margin: 20px;
  }
`

const ImgContainer = styled.div`
  display: flex;
  margin-top: 3vw;
  /* min-width: 30%; */
  flex-direction: column;

  justify-content: center;

  /* flex: 1; */
  @media (max-width: 700px) {
    width: 80%;
    /* height: 20vh; */
    margin: 20px;
    height: 35vh;
  }
`

const Image = styled.img`
  max-width: 90%;

  max-height: 30vw;
  margin-bottom: 10px;
  object-fit: cover;
  @media (max-width: 700px) {
    max-height: 100vh;
  }
`

const Info = styled.div`
  height: 100%;
  width: 100%;
  opacity: 1;

  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  margin-bottom: -20px;
`

const Icon = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  z-index: 1;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  /* width: ; */
  /* height: 800px; */
  @media (max-width: 700px) {
    margin-top: 40px;
  }
`

const Title = styled.h1`
  font-weight: 600;
  width: 40vw;
  /* font-family: 'Times'; */
  @media (max-width: 700px) {
    font-size: 20px;
    width: 90%;
  }
`
const Desc = styled.p`
  margin: 20px 0px;
  font-weight: 500;
  /* font-family: 'Times'; */
  font-size: 20px;
  width: 40vw;
  color: #4a4e69;
  @media (max-width: 700px) {
    font-size: 15px;
    width: 90%;
  }
`
const Desc1 = styled.p`
  margin: 20px 0px;
  font-weight: 700;
  /* font-family: 'Times'; */
  font-size: 25px;
  width: 10vw;
  @media (max-width: 700px) {
    font-size: 20px;
    /* width: 90%; */
  }
`
const Price = styled.span`
  font-weight: bold;
  font-size: 30px;
  font-color: 'blue';
  @media (max-width: 700px) {
    font-size: 20px;
    /* width: 90%; */
  }
`

// const AddContainer = styled.div`
//   width: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// `
// const AmountContainer=styled.div`
// display : flex;
// align-items:center;
// font-weight: 700;
// `;
// const Amount = styled.span`
//   width: 30px;
//   height: 30px;
//   border-radius: 10px;
//   border: 1px solid teal;
//   display: flex;
//   justify-content: space-between;
// `
const Button1 = styled.button`
  /* background-color: 'gray'; */
  color: 'white';

  font-size: 20px;
  margin: 1em;
  /* padding: 0.25em 1em; */
  border: none;

  /* cursor: pointer; */

  /* &:hover {
    background-color: #f8f4f9;
  } */
`
const Text = styled.button`
  background: 'blue';
  color: 'black';
  margin-top: 200px;
  margin-bottom: 200px;
  margin: 0.9em;
  font-size: 17px;
  font-weight: 200;
  padding: -0.25em 1em;
  border: 2px solid gray;
  border-radius: 3px;
  padding: 4px;
  transition: all 0.5s ease;

  cursor: pointer;
  &:hover {
    background-color: #dcd2df;
    transform: scale(1.1);
  }
`

const Similar = styled.div`
  margin: 10px;
  margin-left: 20px;
  flex-wrap: wrap;
  overflow-x: scroll;
`
const Items = styled.div`
  display: flex;
`
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#CAD1D4',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const ProductDetails = () => {
  const dispatch = useDispatch()
  const { product, loading } = useSelector((state) => state.productDetails)
  // const { image } = useSelector((state) => state.productImage)
  // const { product, loading } = useSelector((state) => state.productDetails)
  const { products } = useSelector((state) => state.products)
  const [open, setOpen] = useState(false)
  const { id } = useParams()
  const alert = useAlert()

  const cartHandler = () => {
    // e.preventDefault()
    dispatch(addToCart(id))
    alert.success('Item added to cart')
  }
  let pr = products.filter((i) => i._id === product._id)

  let similarPr = products.filter((i) => i.category === product.category)
  similarPr = similarPr.filter((i) => i._id !== product._id)

  useEffect(() => {
    dispatch(getProductDetails(id))

    dispatch(getProduct())
  }, [dispatch, id])

  const handleClose = () => setOpen(false)

  return (
    <Container>
      <MetaData title={`${product.name} at WorthIT`} />
      <Wrapper>
        <ImgContainer>
          {pr && pr.map((i) => <Image src={i.images[0].url} />)}
          <Info>
            <Icon>
              <ShoppingCartOutlined
                onClick={() => cartHandler()}
                fontSize='large'
              />
            </Icon>
            {/* <Icon>
              <FavoriteBorderOutlined fontSize='large' />
            </Icon> */}
          </Info>
        </ImgContainer>
        <InfoContainer>
          <Title>{product.name}</Title>
          <br></br>
          {/* <Title>Ansic</Title> */}
          <Desc1>Description</Desc1>
          <Desc>{product.description}</Desc>
          <Desc1>
            Category
            <Desc style={{ marginTop: '5px' }}>{product.category}</Desc>
          </Desc1>
          <Price>
            ₹{product.price} <br />
            <br />
          </Price>
          <Button>
            <Button1 onClick={() => setOpen(true)}>Contact Owner</Button1>
            <Modal
              aria-labelledby='transition-modal-title'
              aria-describedby='transition-modal-description'
              open={open}
              onClose={handleClose}
              closeAfterTransition
              // BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <Box sx={style}>
                  <Typography
                    id='transition-modal-title'
                    variant='h6'
                    component='h2'
                  >
                    Seller Information
                  </Typography>
                  <Typography id='transition-modal-description' sx={{ mt: 2 }}>
                    <b>{`Seller Name : ${product.userName}`}</b>
                    <br></br>

                    <b>{`Seller Email : ${product.userEmail}`}</b>
                    <br></br>
                    {product.sem && <b>{`Owner semester : ${product.sem} `}</b>}
                    <br />
                    {product.mobileNo && (
                      <b>{`Owner Mobile No. : ${product.mobileNo} `}</b>
                    )}
                    <br />
                    {product.department && (
                      <b>{`Owner department. : ${product.department} `}</b>
                    )}
                  </Typography>
                </Box>
              </Fade>
            </Modal>
            <Button variant='contained' onClick={() => cartHandler()}>
              BUY NOW
            </Button>
          </Button>
        </InfoContainer>
      </Wrapper>
      <Similar>
        <Title>Similar Items</Title>
        <Items>
          {similarPr &&
            similarPr.slice(0, 4).map((item) => (
              // <img src={item.images[0].url} />
              <SingleItem item={item} />
            ))}
        </Items>
      </Similar>
    </Container>
  )
}

export default ProductDetails
