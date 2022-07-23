import { MenuItem, Select, Slider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useNavigationType, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { getProduct } from '../action/productAction'
import SingleItem from '../component/SingleItem'
// import { allProducts } from '../data'

const Container = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  position: relative;
  /* background-color: #e0fbfc; */
  background-color: #e7e8e9;
  min-height: 100vh;
  @media (max-width: 700px) {
    flex-direction: column;
  }
`
const FilterContainer = styled.div`
  display: flex;
  flex: 0.35;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  /* width: 20vmax; */
  position: absolute;
  top: 10vmax;
  left: 1vmax;
  @media (max-width: 700px) {
    top: 1vmax;

    flex-direction: row;
    /* margin-bottom: 60vh; */
  }
`
const Filter = styled.div`
  margin: 20px;
  font-weight: 900;
  font-size: 17px;
  width: 15vmax;
`
const FilterText = styled.span`
  display: flex;

  margin-bottom: 5px;
`

const Categories = styled.div`
  margin: 20px;
  margin-top: 50px;
  width: 80%;
  align-items: center;
  flex: 0.65;
`

const Items = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* margin-lef: 0px; */
  margin: 30px;
  /* margin-top: 0px; */
  @media (max-width: 700px) {
    justify-content: flex-start;
    flex-direction: column;
    flex-wrap: none;
    margin-top: 90px;
    margin-left: 0px;
  }
`
const Image = styled.img`
  margin-left: 30vw;
  width: 20vw;
  height: 10vw;

  @media (max-width: 700px) {
    margin-left: 8vw;
    margin-top: 20vh;
    width: 70vw;
    height: 30vh;
  }
`
const CategoryName = styled.h2`
  margin: 20px;
`

function AllProduct() {
  const categories = [
    'All',
    'Books',
    'Electronics',
    'Chemical',
    'Mechanical',
    'Civil',
    'Computer',
  ]

  const { keyword } = useParams()
  const [price, setPrice] = useState([0, 1000])
  const [category, setCategory] = useState('All')
  const dispatch = useDispatch()
  const { loading, products } = useSelector((state) => state.products)

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice)
  }

  // let availableProducts = products.filter((i) => i.status !== 'sold')
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getProduct(keyword, price, category))
  }, [dispatch, keyword, price, category])

  return (
    <Container>
      <FilterContainer>
        <Filter>
          <FilterText>Price</FilterText>

          <Slider
            value={price}
            onChange={priceHandler}
            valueLabelDisplay='auto'
            aria-labelledby='range-slider'
            min={0}
            max={1000}
          />
        </Filter>
        <Filter>
          <FilterText>Categories</FilterText>

          <Select
            onChange={(event) => setCategory(event.target.value)}
            style={{ width: '200px' }}
            value={category}
          >
            {categories.map((c) => (
              <MenuItem value={c}>{c}</MenuItem>
            ))}
          </Select>
        </Filter>
      </FilterContainer>
      <Categories>
        {loading ? (
          <Image
            src='/image/loading.gif'
            alt='loading ....'
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        ) : (
          <Items>
            {products.length === 0 && (
              <h1
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: '20vw',
                }}
              >
                No products Found Modify your search
                <br />
                Or request your Item
                <span
                  style={{
                    color: 'red',
                    textDecoration: 'underline',
                  }}
                  onClick={() => navigate('/requestItem')}
                >
                  here
                </span>
              </h1>
            )}
            {products && products.map((item) => <SingleItem item={item} />)}
          </Items>
        )}
      </Categories>
    </Container>
  )
}

export default AllProduct
