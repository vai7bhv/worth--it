import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Category from '../component/Category'
import NewItems from '../component/NewItems'
import { useNavigate } from 'react-router-dom'
import Hero from '../component/Hero'
import Slider, { SliderData } from '../component/Slider'
import MetaData from '../component/MetaData'
import { Button } from '@mui/material'
// import { Sl } from '../component/SliderData'
const Container = styled.div`
  position: relative;
  max-width: 100vw;
  /* background-image: url('/image/AnimatedShape.svg'); */
`
const Photo = styled.img`
  position: relative;
  width: 100vw;
  height: 90vh;
  @media (max-width: 600px) {
    width: 114vw;
    height: 60vh;
  }
`
const TextOnImage = styled.div`
  position: absolute;
  right: 60%;
  left: 10%;
  /* bottom: 10%; */
  top: 10%;

  justify-content: space-between;
  position: absolute;
  /* background-color: #f9f9f9; */

  /* display: flex; */
  /* flex-direction: column; */
`
const Des2 = styled.div`
  height: 95vh;
  /* margin-top: 10vh; */
  display: flex;
  background-color: #edf2fb;
  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`

const Des1 = styled.div`
  height: 95vh;
  /* margin-top: 10vh; */
  display: flex;
  background-color: #4d77ff;

  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`

const Image = styled.img`
  width: 40vw;
  height: 60vh;
  margin-left: 10vw;
  margin-right: 10vw;
  margin-top: 14vh;
  /* animation: slideInLeft; */
  /* animation-duration: 1.5s; */
  align-items: center;
  justify-content: center;
  /* background-color: #5463ff; */
  @media (max-width: 700px) {
    width: 90vw;
    height: 40vh;
    margin-top: 5vw;
  }
`
const Info = styled.div`
  /* animation: slideInDown; /* referring directly to the animation's @keyframe declaration */
  /* animation-duration: 1s;  */
  /* --animate-delay: 2s; */
  align-items: center;
  justify-content: center;
  margin-top: 10vw;
  width: 30vw;
  @media (max-width: 700px) {
    width: 90vw;
    margin-top: 1vw;
  }
`
const Title = styled.h1`
  font-size: 4vw;
  color: #c2fff9;
  @media (max-width: 700px) {
    font-size: 36px;
  }
`

const Desc = styled.p`
  display: flex;
  color: #efefef;
  margin-top: 2px;
  font-size: 22px;
  letter-spacing: 1px;
  @media (max-width: 700px) {
    font-size: 16px;
  }
`
const Button2 = styled.button`
  /* --color: #560bad; */
  --color: #355070;
  font-family: inherit;
  display: inline-block;
  width: 8em;
  height: 2.6em;
  line-height: 2.5em;
  margin: 20px;
  position: relative;
  overflow: hidden;
  border: 2px solid var(--color);
  transition: color 0.5s;
  z-index: 1;
  font-size: 17px;
  border-radius: 6px;
  font-weight: 500;
  color: #560bad;

  &:before {
    content: '';
    position: absolute;
    z-index: -1;
    background: var(--color);
    height: 150px;
    width: 200px;
    border-radius: 50%;
  }
  &:hover {
    color: #fff;
  }
  &:before {
    top: 100%;
    left: 100%;
    transition: all 0.7s;
  }

  &:hover:before {
    top: -30px;
    left: -30px;
  }
  &:active:before {
    background: #3a0ca3;
    transition: background 0s;
  }
`
const Title2 = styled.h1`
  font-size: 4vw;
  color: #4361ee;
  @media (max-width: 700px) {
    font-size: 36px;
  }
`

const Desc2 = styled.p`
  font-size: 22px;
  letter-spacing: 1px;
  display: flex;
  color: #2b2d42;
  @media (max-width: 700px) {
    font-size: 16px;
  }
`

function Homepage() {
  const navigate = useNavigate()

  return (
    <Container>
      <MetaData title='WorthIT' />
      {/* <Photo
        src='https://images.unsplash.com/photo-1468779036391-52341f60b55d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1368&q=80'
        alt='book-image'
      /> */}
      {/* <TextOnImage>
        <h1>Help Others to study.</h1>

        <h2>Make world better place</h2>
      </TextOnImage> */}
      {/* <Hero slides={SliderData} /> */}
      <Slider />
      <Des1>
        <Image src='/image/addfile.png' />
        <Info>
          <Title>Add Products</Title>
          <Desc>
            If you have any product which you dont need add here. So Other
            Students can Buy it.
          </Desc>
          <Button2 onClick={() => navigate('/addItem')}>ADD</Button2>
        </Info>
      </Des1>
      <Des2>
        <Image src='/image/request.png' />
        <Info>
          <Title2>Request Item</Title2>
          <Desc2>
            If you dont find what you looking for Request the product.Click
            below to Request.
          </Desc2>
          <Button2
            style={{ color: '#000' }}
            onClick={() => navigate('/requestItem')}
          >
            View
          </Button2>
        </Info>
      </Des2>

      <NewItems />

      {/* <Category /> */}
    </Container>
  )
}

export default Homepage
