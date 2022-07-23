import { Delete, Edit, LaunchOutlined } from '@mui/icons-material'
import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { myOrders } from '../action/orderAction'
import { DataGrid } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

import {
  deleteProduct,
  getMyProducts,
  getProductDetails,
} from '../action/productAction'
import { DELETE_PRODUCT_RESET } from '../reducers/constant/allConstant'
import { useAlert } from 'react-alert'
import { Button } from '@mui/material'
import { deleteRequest, getMyRequests } from '../action/requestAction'
import MetaData from '../component/MetaData'

const Container = styled.div``
const Buy = styled.div``
const Orders = styled.div`
  margin: 20px;
  font-weight: 900;
  .MuiDataGrid-iconSeparator {
    display: none !important;
  }

  @media (max-width: 600px) {
    padding: 0;
  }
`

const Item = styled.div`
  display: flex;
  margin: 20px;
  justify-content: space-evenly;
  align-items: center;
  margin: 3vh;
`
const Image = styled.img`
  width: 120px;
  height: 120px;
`
const Req = styled.div``
const Info = styled.div`
  margin-left: 10px;
`
const Name = styled.h2`
  text-align: center;
  font: 400 1.2vmax;
  padding: 0.5vmax;
  margin: 4vh;
  box-sizing: border-box;
  color: rgb(255, 255, 255);
  transition: all 0.5s;
  background-color: rgb(44, 44, 44);
`
const Title = styled.h3`
  flex-wrap: wrap;
  max-width: 30vw;
`
const Status = styled.h4``
const Price = styled.h3``
const Sell = styled.div`
  margin: 20px;
`
const Button1 = styled.button`
  width: 200px;
  /* margin: 50px; */
  background-color: #343a40;
  padding: 10px;
  color: #fdfffc;
  border-radius: 5px;
  font-size: 20px;
  margin-top: 1vw;
  margin-left: 2vw;
  margin-bottom: 2vw;
  &:hover {
    background-color: #8e9aaf;
    color: #000;
  }
  @media (max-width: 700px) {
    margin: 20px;
    /* margin-left:; */
    width: 150px;
    font-size: medium;
  }
`

function DashBoard() {
  const dispatch = useDispatch()
  const { loading, error, orders } = useSelector((state) => state.myOrders)
  const { myProducts } = useSelector((state) => state.myProducts)
  const { myRequests } = useSelector((state) => state.myRequests)
  // const { product } = useSelector((state) => state.productsDetails)
  // const { requests } = useSelector((state) => state.myRequests)
  const { user } = useSelector((state) => state.user)
  const alert = useAlert()
  const navigate = useNavigate()
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  )
  const columns = [
    {
      field: 'id',
      headerName: 'Order ID',
      minWidth: 300,
      flex: 1,
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: 'amount',
      headerName: 'Amount',
      type: 'number',
      minWidth: 140,
      flex: 0.3,
    },
    {
      field: 'date',
      headerName: 'Date',
      minWidth: 140,
      flex: 0.3,
      type: 'number',
    },
    {
      field: 'actions',
      flex: 0.3,
      headerName: 'Actions',
      minWidth: 150,
      type: 'number',
      sortable: false,
      renderCell: (params) => {
        return (
          <Link
            to={`/order/${params.getValue(params.id, 'id')}`}
            style={{ color: 'chocolate' }}
          >
            <LaunchOutlined />
          </Link>
        )
      },
    },
  ]

  const rows = []
  const reqColumns = [
    // {
    //   field: 'id',
    //   headerName: 'ID',
    //   maxWidth: 0,
    //   flex: 1,

    // },
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 300,
      flex: 1,
    },
    {
      field: 'description',
      headerName: 'Description',
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: 'actions',
      flex: 0.3,
      headerName: 'Actions',
      minWidth: 150,
      type: 'number',
      sortable: false,
      renderCell: (params) => {
        return (
          <Button
            onClick={() =>
              handleDeleteRequest(params.getValue(params.id, 'id'))
            }
          >
            <Delete />
          </Button>
        )
      },
    },
  ]

  const reqRows = []

  myRequests &&
    myRequests.forEach((item, index) => {
      reqRows.push({
        id: item._id,
        name: item.name,
        description: item.description,
      })
    })

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
        date: item.createdAt.slice(0, 10),
      })
    })

  const productColumns = [
    // {
    //   field: 'id',
    //   headerName: 'Product ID',
    //   minWidth: 50,
    //   flex: 0.5,
    // },
    {
      field: 'images',
      headerName: 'Images',

      minWidth: 50,
      flex: 1,
      renderCell: (params) => (
        <img
          style={{ objectFit: 'contain', width: '15vw', height: '10vh' }}
          src={params.value}
          alt='Product image'
        />
      ),
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
              onClick={() => handleDelete(params.getValue(params.id, 'id'))}
            >
              <Delete />
            </Button>
          </Fragment>
        )
      },
    },
  ]

  const productRows = []

  myProducts &&
    myProducts.forEach((item) => {
      productRows.push({
        id: item._id,
        status: item.productStatus,
        price: item.price,
        name: item.name,
        images: item.images[0].url,
      })
    })

  useEffect(() => {
    setTimeout(() => {}, 1000)

    if (isDeleted) {
      alert.success('Product Deleted Successfully')
      // ('/admin/dashboard')
      dispatch({ type: DELETE_PRODUCT_RESET })
    }
    dispatch(myOrders())
    dispatch(getMyProducts())
    dispatch(getMyRequests())
  }, [dispatch, alert, error, deleteError, isDeleted])

  const handleDelete = (pid, userId) => {
    // dispatch(getProductDetails(id))
    // if (user._id !== userId)
    //   alert.error('You dont have permission to delete this product')
    // else
    dispatch(deleteProduct(pid))
  }
  const handleDeleteRequest = (id) => {
    dispatch(deleteRequest(id))
  }

  return (
    <Container>
      <MetaData title='Dashboard    --WorthIT' />
      <Buy>
        <Name>My Orders</Name>
        <Orders>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            // className='myOrdersTable'
            autoHeight
            // style={{
            //   fontWeight: 300,
            // }}
            sx={{
              boxShadow: 5,
              color: 'black',
              fontWeight: 600,

              // border: 2,
              // borderColor: 'primary.light',
              '& .MuiDataGrid-cell:hover': {
                color: 'primary.main',
              },
            }}
          />
        </Orders>
      </Buy>
      <Sell>
        <Name>Items For Sell</Name>
        <Button1 onClick={() => navigate('/addItem')}>Add item</Button1>

        <DataGrid
          rows={productRows}
          columns={productColumns}
          pageSize={10}
          disableSelectionOnClick
          // className='myOrdersTable'
          autoHeight
          sx={{
            boxShadow: 5,
            color: 'black',
            fontWeight: 600,

            '& .MuiDataGrid-cell:hover': {
              color: 'primary.main',
            },
          }}
        />
      </Sell>
      <Req>
        <Name>Requests By User</Name>
        <Button1 onClick={() => navigate('/requestItem')}>requestItem</Button1>
        <DataGrid
          rows={reqRows}
          columns={reqColumns}
          pageSize={10}
          disableSelectionOnClick
          // className='myOrdersTable'
          autoHeight
          sx={{
            boxShadow: 5,
            color: 'black',
            fontWeight: 600,
            width: '95%',
            marginLeft: '2vw',

            '& .MuiDataGrid-cell:hover': {
              color: 'primary.main',
            },
          }}
        />
      </Req>
    </Container>
  )
}

export default DashBoard
