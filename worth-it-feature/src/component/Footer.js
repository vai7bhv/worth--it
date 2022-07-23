import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
  /* padding: 20px; */
  background-color: #180c54;
  width: 100%;

  position: relative;
  @media (max-width: 600px) {
    margin-top: 20vw;
    /* position: fixed; */
  }
`
const Wrapper = styled.div`
  /* flex-direction: column; */
  justify-content: center;
  max-width: 80%;
  margin: 0 auto;
  background-color: #180c54;
  display: flex;
  margin-top: 10px;
`
const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 60px;
  font-weight: bold;
  background-color: #180c54;
`
// const Row = styled.div`
//   background-color: gray;
//   display: flex;
//   display: grid;
//   grid-template-columns: repeat(auto-fill, min-max(230px, 1fr));
//   grid-gap: 20px;

//   @media (max-width: 1000px) {
//     grid-template-columns: repeat(auto-fill, min-max(200px, 1fr));
//   }
//  `
const Link1 = styled.div`
  background-color: #180c54;
  cursor: pointer;
  color: gold;
  margin-bottom: 10px;
`
const Link = styled.a`
  background-color: #180c54;
  cursor: pointer;
  color: gold;
  margin-bottom: 10px;
`
const Title = styled.div`
  background-color: #180c54;
  color: white;
  margin-bottom: 10px;
`

function Footer() {
  const navigate = useNavigate()
  return (
    <Container>
      <Wrapper>
        {/* <Row> */}

        <Column>
          <Title>Menu</Title>
          <Link1 onClick={() => navigate('/products')}>View Items</Link1>
          <Link1 onClick={() => navigate('/')}>Categories</Link1>
          <Link1 onClick={() => navigate('/cart')}>MyCart</Link1>
          <Link1 onClick={() => navigate('/profile')}>Profile</Link1>
        </Column>
        <Column>
          <Title>Contact Us</Title>
          <Link href='#'>Linked In</Link>
          <Link href='#'>Email</Link>
        </Column>
        <Column>
          <Title>Social</Title>
          <Link href='http://instagram.com/vansh_1_7'>Instagram</Link>
          {/* <Link to="/react">React</Link> */}
          <Link href='https://github.com/vansh017/'>Github</Link>
          <Link href='#'>Facebook</Link>
        </Column>
        {/* </Row> */}
      </Wrapper>
    </Container>
  )
}
export default Footer
