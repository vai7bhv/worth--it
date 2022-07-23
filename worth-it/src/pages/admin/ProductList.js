import { Delete, Edit } from '@mui/icons-material'
import { Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { Fragment, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { clearErrors } from '../../action/orderAction'
import { deleteProduct, getAdminProduct } from '../../action/productAction'
import MetaData from '../../component/MetaData'
import { DELETE_PRODUCT_RESET } from '../../reducers/constant/allConstant'
import Sidebar from './Sidebar'

const Container = styled.div`
  display: flex;
`

const Title = styled.h2`
  margin: 40px;
  justify-content: 'center';
  align-items: 'center';
  margin-left: 36vw;
`

const Right = styled.div``
function Products() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const alert = useAlert()

  const { error, products } = useSelector((state) => state.products)
  const { user } = useSelector((state) => state.user)

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  )

  // if (user.role !== 'admin') {
  //   alert.error('You are not allowed to access  this page ')
  //   navigate('/dashboard')
  // }
  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id))
  }

  useEffect(() => {
    if (user.role !== 'admin') {
      alert.error('You are not allowed to access  this page ')
      navigate('/dashboard')
    }
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }

    if (deleteError) {
      alert.error(deleteError)
      dispatch(clearErrors())
    }

    if (isDeleted) {
      alert.success('Product Deleted Successfully')
      // navigate('/admin/')
      dispatch({ type: DELETE_PRODUCT_RESET })
    }

    dispatch(getAdminProduct())
  }, [dispatch, alert, error, deleteError, isDeleted])

  const columns = [
    {
      field: 'images',
      headerName: 'Images',

      minWidth: 50,
      flex: 1,
      renderCell: (params) => (
        <img
          style={{ objectFit: 'contain', width: '15vw', height: '10vh' }}
          src={params.value}
        />
      ),
    },
    {
      field: 'id',
      headerName: 'Product ID',
      minWidth: 50,
      flex: 0.5,
    },

    {
      field: 'name',
      headerName: 'Name',
      minWidth: 50,
      flex: 1,
    },

    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      minWidth: 20,
      flex: 0.5,
    },
    {
      field: 'status',
      headerName: 'Status',
      type: 'string',
      minWidth: 50,
      flex: 0.5,
    },

    {
      field: 'actions',
      flex: 0.3,
      headerName: 'Actions',
      minWidth: 70,
      type: 'number',
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/product/update/${params.getValue(params.id, 'id')}`}>
              <Edit />
            </Link>

            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, 'id'))
              }
            >
              <Delete />
            </Button>
          </Fragment>
        )
      },
    },
  ]

  const rows = []

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        status: item.productStatus,
        price: item.price,
        name: item.name,
        images: item.images[0].url,
      })
    })
  return (
    <Container>
      <MetaData title='Admin All Products -- WorthIT' />
      <Sidebar />
      <Right>
        <Title>Product List</Title>

        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={15}
          disableSelectionOnClick
          className='productListTable'
          autoHeight
          style={{ width: '80vw' }}
        />
      </Right>
    </Container>
  )
}

export default Products
