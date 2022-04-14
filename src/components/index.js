/** @format */

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, deleteAll } from '../actions/index'
import List from './list'
import { v4 as uuid } from 'uuid'
//MUI
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

const Todo = () => {
  const [inputData, setInputData] = useState('')
  const [filter, setFilter] = useState(null)

  const list = useSelector((state) => {
    return state.todoReducer.todoList
  })
  console.log('list', list)

  const dispatch = useDispatch()

  const handleTodo = (task) => {
    try {
      if (!task) {
        throw new Error('Empty Field')
      }

      const payload = {
        title: task,
        id: uuid(),
      }
      const action = addTodo(payload)
      dispatch(action)
      console.log('payload', payload)
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleActive = () => {
    const filteredArray = list.filter((item) => item.status)
    console.log('active=====', filteredArray)
    setFilter(filteredArray)
  }
  const handleInactive = () => {
    const filteredArray = list.filter((item) => !item.status)
    console.log('inActive=====', filteredArray)

    setFilter(filteredArray)
  }

  return (
    <FormControl style={{ marginTop: 100 }}>
      <RadioGroup
        row
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
      >
        <FormControlLabel
          value="Active"
          control={<Radio />}
          label="Active"
          name="filter"
          onClick={() => handleActive()}
        />
        <FormControlLabel
          value="Inactive"
          control={<Radio />}
          label="Inactive"
          name="filter"
          onClick={() => handleInactive()}
        />
      </RadioGroup>
      <Box
        centered
        sx={{
          width: 500,
          maxWidth: '70%',
        }}
      >
        <TextField
          sx={{
            // width: 500,
            // maxWidth: "70%",
            height: 40,
          }}
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          fullWidth
          label="Add Todo"
          id="AddTodo"
        />
      </Box>
      <Stack direction="column" spacing={2}>
        <Button
          sx={{
            width: 500,
            maxWidth: '70%',
          }}
          onClick={() => handleTodo(inputData)}
          variant="contained"
          color="success"
          size="small"
        >
          Add Todo
        </Button>
      </Stack>
      <Stack direction="column" spacing={2}>
        <br />

        <Button
          sx={{
            width: 500,
            maxWidth: '70%',
          }}
          onClick={() => dispatch(deleteAll())}
          variant="contained"
          color="secondary"
          size="small"
        >
          Delete All Todos
        </Button>
      </Stack>
      {!filter &&
        list.map((item, index) => {
          return <List key={index} data={item} />
        })}
      {filter &&
        filter.map((item, index) => {
          return <List key={index} data={item} />
        })}
    </FormControl>
  )
}

export default Todo
