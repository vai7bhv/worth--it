import { CssBaseline } from '@material-ui/core'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@mui/icons-material'
// import { Button } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { slideData } from '../data'
// import '../image/image01.jpg'

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  /* background-color: #e3e1de; */
  position: relative;
  overflow: hidden;
`
const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === 'left' && '10px'};
  right: ${(props) => props.direction === 'right' && '10px'};
  margin: auto;
  cursor: pointer;
  opacity: 0.6;
  z-index: 2;
`
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  /* transform: translateX(${(props) => props.slideNum * -100}vw); */
`
const Slide = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #${(props) => props.bg};
  @media (max-width: 700px) {
    flex-direction: column;
  }
  /* background-color: red; */
`
const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
  @media (max-width: 700px) {
    height: 40%;
  }
`
const Image = styled.img`
  height: 80%;
  width: 100%;
  border-radius: 10px;
  @media (max-width: 700px) {
    height: 100%;
  }
  /* margin-top: 20px; */
`
const InfoContainer = styled.div`
  flex: 1;
`
const Title = styled.h6`
  font-size: 5vw;
  color: #4361ee;
  @media (max-width: 700px) {
    font-size: 36px;
  }
`
const Desc = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 1px;
  width: 40vw;
  @media (max-width: 700px) {
    font-size: 16px;
    width: 90vw;
    margin: 10px;
  }
`
const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
  @media (max-width: 700px) {
    margin-left: 30vw;
    margin-top: 20px;
  }
`

function Slider() {
  const [slideNum, setSlideNum] = useState(0)
  const [current, setCurrent] = useState(0)
  const navigate = useNavigate()

  // const timeout = useRef(null)
  // useEffect(() => {
  //   const nextSlide = () => {
  //     setCurrent((current) =>
  //       current === slideData.length - 1 ? 0 : current + 1
  //     )
  //   }
  //   timeout.current = setTimeout(nextSlide, 2500)

  //   return function () {
  //     if (timeout.current) {
  //       clearTimeout(timeout.current)
  //     }
  //   }
  // }, [current, slideData.length])
  const handleClick = (dir) => {
    if (dir === 'left') setSlideNum(slideNum > 0 ? slideNum - 1 : 2)
    else setSlideNum(slideNum < 2 ? slideNum + 1 : 0)
  }
  const nextSlide = () => {
    setSlideNum(slideNum < 3 ? slideNum + 1 : 0)

    console.log(current)
  }
  const prevSlide = () => {
    setSlideNum(slideNum > 0 ? slideNum - 1 : 3)

    console.log(current)
  }

  // setTimeout(function () {
  //   nextSlide()
  // }, 3000)

  return (
    <Container>
      <CssBaseline />
      {/* <Arrow direction='left'>
        <ArrowLeftOutlined
          direction='left'
          fontSize='large'
          onClick={() => prevSlide()}
        />
      </Arrow> */}
      <Wrapper slideNum={slideNum}>
        <Slide>
          <ImgContainer>
            {/* <Image src='./image/image02.jpg' /> */}
            <Image src='/image/bookHome.png' />
          </ImgContainer>
          <InfoContainer>
            <Title>View Products</Title>
            <Desc>
              Why every time buy new product at higher price when you get it at
              lesser price.
            </Desc>

            <Button onClick={() => navigate('/products')}>View</Button>
          </InfoContainer>
        </Slide>
      </Wrapper>
      {/* <Arrow direction='right'>
        <ArrowRightOutlined
          direction='right'
          fontSize='large'
          // onClick={() => handleClick('right')}
          onClick={() => nextSlide()}
        />
      </Arrow> */}
    </Container>
  )
}

export default Slider
