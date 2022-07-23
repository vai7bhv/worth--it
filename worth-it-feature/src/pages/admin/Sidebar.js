import { Drawer } from '@material-ui/core'
import { ListAlt, People, PostAdd } from '@mui/icons-material'
// import { List } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  /* background-color: rgb(255, 255, 255); */
  display: flex;
  flex-direction: column;
  padding-top: 4rem;
  /* width: 1vw; */
  margin: 3vw;
  /* margin-right: 5vw; */
`
const Icon = styled.div`
  margin-right: 0.5rem;
`
const Item = styled.div`
  text-decoration: none;
  color: rgba(0, 0, 0, 0.99);

  transition: all smooth 1s;
  padding-bottom: 2rem;
  display: flex;
  align-items: center;
  font-size: 15px;
  &:hover {
    color: tomato;
    /* transform: scale(1.1); */
    transition: width 2s, height 2s, transform 2s;
  }
`

function Sidebar() {
  const navigate = useNavigate()
  return (
    <Container>
      <Item>
        <Icon>
          <PostAdd
            onClick={() => navigate('/admin/products')}
            fontSize='large'
          />
        </Icon>
        products
      </Item>
      <Item>
        <ListAlt onClick={() => navigate('/admin/orders')} fontSize='large' />
        orders
      </Item>
      <Item>
        <People onClick={() => navigate('/admin/users')} fontSize='large' />
        users
      </Item>
    </Container>
  )
}

export default Sidebar
