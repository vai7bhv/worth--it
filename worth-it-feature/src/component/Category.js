import React from 'react'
import styled from 'styled-components'
import { category } from '../data'
import SingleCategory from './SingleCategory'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
  margin-top: 50px;
  /* flex: 1; */
  /* border: 2px solid gray; */

  border-radius: 5px;
  margin-left: 50px;
  /* margin-right: 20px; */
  overflow-x: scroll;
  justify-content: center;
  align-items: center;
  width: 90%;
`
const Heading = styled.div`
  font-size: 20px;
  display: flex;
  justify-content: space-between;
`
const Items = styled.div`
  display: flex;
  object-fit: contain;
`
function Category() {
  const navigate = useNavigate()

  return (
    <Container>
      <Heading>
        <h4>Categories</h4>
        <h4 onClick={() => navigate('/products')} style={{ cursor: 'pointer' }}>
          All Category
        </h4>
      </Heading>
      <Items>
        {category.map((item) => (
          <SingleCategory item={item} />
        ))}
      </Items>
    </Container>
  )
}

export default Category
