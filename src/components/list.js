/** @format */

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
//MUI
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'

import { deleteTodo, editTodo, updateStatus } from '../actions'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}
const List = ({ data }) => {
  const [inputData, setInputData] = useState('')
  const [editState, setEditState] = useState('')
  const [isChecked, setIsChecked] = useState(data.status)
  // modal

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  // console.log("datadatadatadata", data);
  const dispatch = useDispatch()
  const handleDelete = (id) => {
    dispatch(deleteTodo(id))
  }
  //task is simple string passing
  const handleEdit = (task) => {
    try {
      if (!task) {
        throw new Error('Empty Field')
      }
      const payload = {
        title: task,
        id: data.id,
      }
      const action = editTodo(payload)
      dispatch(action)
      console.log('payload', payload)
      setEditState(false)
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleStatus = (task) => {
    // console.log(first)
    setIsChecked(!isChecked)
    try {
      const payload = {
        id: data.id,
        status: task,
      }
      const action = updateStatus(payload)
      console.log('actionactionactionaction', action)
      dispatch(action)
      // console.log("action status", action);
    } catch (error) {
      console.log('error', error)
    }
  }
  return (
    <div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <input
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
              />
              <button onClick={() => handleEdit(inputData)}>Save</button>
            </Typography>
          </Box>
        </Modal>
      </div>
      <div style={{ marginRight: 150, textAlign: 'center' }}>
        <br />
        <b>{data?.title}</b> {'        '}
        <Button
          sx={{
            width: 120,
            maxWidth: '40%',
          }}
          onClick={() => handleDelete(data.id)}
          variant="contained"
          color="secondary"
          size="small"
        >
          Delete Todo
        </Button>{' '}
        {''}
        <Button
          sx={{
            width: 120,
            maxWidth: '40%',
          }}
          onClick={() => {
            handleOpen()
            setEditState(!editState)
          }}
          variant="outlined"
          color="success"
          size="small"
        >
          edit
        </Button>{' '}
        <b>{isChecked ? 'Active' : 'Inactive'}</b>
        <input type="checkbox" onClick={() => handleStatus(!data.status)} />
      </div>
    </div>
  )
}

export default List
