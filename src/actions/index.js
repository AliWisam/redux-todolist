/** @format */

export const addTodo = ({ title, id }) => ({
  type: "ADD_TODO",
  payload: {
    title,
    id,
  },
});

export const deleteTodo = (id) => ({
  type: "DELETE_TODO",
  payload: {
    id,
  },
});

export const deleteAll = () => ({
  type: "DELETE_ALL_TODO",
});

export const editTodo = ({ title, id }) => ({
  type: "EDIT_TODO",
  payload: {
    title,
    id,
  },
});

// editTodo({id, title})
export const updateStatus = ({ id, status }) => ({
  type: "UPDATE_STATUS",
  payload: {
    id,
    status,
  },
});
