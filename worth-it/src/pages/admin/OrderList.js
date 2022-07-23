import { Delete, Edit } from '@mui/icons-material'
import { Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { Fragment, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { deleteOrder, getAllOrders } from '../../action/orderAction'
import { clearError } from '../../action/userAction'
import MetaData from '../../component/MetaData'
import { DELETE_ORDER_RESET } from '../../reducers/constant/allConstant'
import Sidebar from './Sidebar'

const Wrapper = styled.div``
const Title = styled.h2`
  margin: 40px;
  justify-content: 'center';
  align-items: 'center';
  margin-left: 36vw;
`

function OrderList() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const alert = useAlert()

  const { error, orders } = useSelector((state) => state.allOrders)

  const { error: deleteError, isDeleted } = useSelector((state) => state.order)

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id))
  }

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearError())
    }

    if (deleteError) {
      alert.error(deleteError)
      dispatch(clearError())
    }

    if (isDeleted) {
      alert.success('Order Deleted Successfully')
      navigate('/admin/orders')
      dispatch({ type: DELETE_ORDER_RESET })
    }

    dispatch(getAllOrders())
  }, [dispatch, alert, error, navigate, deleteError, isDeleted])

  const columns = [
    { field: 'id', headerName: 'Order ID', minWidth: 100, flex: 1 },

    {
      field: 'status',
      headerName: 'Status',
      minWidth: 50,
      flex: 0.5,
    },
    {
      field: 'user',
      headerName: 'UserName',
      minWidth: 50,
      flex: 0.5,
    },
    {
      field: 'itemsQty',
      headerName: 'Items Qty',
      type: 'number',
      minWidth: 50,
      flex: 0.4,
    },

    {
      field: 'amount',
      headerName: 'Amount',
      type: 'number',
      minWidth: 70,
      flex: 0.5,
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
          <Fragment>
            <Link to={`/order/${params.getValue(params.id, 'id')}`}>
              <Edit />
            </Link>

            <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, 'id'))
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

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
        user: item.userName,
      })
    })

  return (
    <div style={{ display: 'flex' }}>
      <MetaData title='Admin All Orders -- WorthIT' />
      <Sidebar />
      <Wrapper>
        <Title>Orders List</Title>

        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          className='productListTable'
          autoHeight
          style={{ width: '80vw' }}
        />
      </Wrapper>
    </div>
  )
}

export default OrderList
