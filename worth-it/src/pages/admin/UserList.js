import { Delete, Edit } from '@mui/icons-material'
import { Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { Fragment, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { clearError, deleteUser, getAllUsers } from '../../action/userAction'
import MetaData from '../../component/MetaData'
import { DELETE_USER_RESET } from '../../reducers/constant/allConstant'
import Sidebar from './Sidebar'

const Wrapper = styled.div``
const Title = styled.h2`
  margin: 40px;
  justify-content: 'center';
  align-items: 'center';
  margin-left: 36vw;
`

function UserList() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const alert = useAlert()

  const { error, users } = useSelector((state) => state.allUsers)

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile)

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id))
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
      alert.success(message)
      navigate('/admin/users')
      dispatch({ type: DELETE_USER_RESET })
    }

    dispatch(getAllUsers())
  }, [dispatch, alert, error, deleteError, isDeleted, message])

  const columns = [
    { field: 'id', headerName: 'User ID', minWidth: 180, flex: 0.8 },

    {
      field: 'email',
      headerName: 'Email',
      minWidth: 200,
      flex: 1,
    },
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: 'role',
      headerName: 'Role',
      type: 'number',
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, 'role') === 'admin'
          ? 'greenColor'
          : 'redColor'
      },
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
            <Link to={`/admin/user/${params.getValue(params.id, 'id')}`}>
              <Edit style={{ color: 'gray' }} />
            </Link>

            <Button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, 'id'))
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

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      })
    })

  return (
    <div style={{ display: 'flex' }}>
      <MetaData title='Admin All Users -- WorthIT' />
      <Sidebar />
      <Wrapper>
        <Title>Users List</Title>
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

export default UserList
