/** @format */

const initialState = {
  todoList: [
    {
      title: "Task One",
      id: "1",
      status: false,
    },
    {
      title: "Task Two",
      id: "2",
      status: false,
    },
    {
      title: "Task three",
      id: "3",
      status: false,
    },
  ],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TODO": {
      return {
        ...state,
        todoList: [...state.todoList, action?.payload],
      };
    }
    case "DELETE_TODO": {
      return {
        ...state,
        todoList: state.todoList.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    }

    case "EDIT_TODO": {
      return {
        ...state,
        todoList: state.todoList.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              title: action.payload.title,
            };
          } else {
            return item;
          }
        }),
      };
    }
    case "DELETE_ALL_TODO": {
      return {
        ...state,
        todoList: [],
      };
    }
    case "UPDATE_STATUS": {
      // console.log("action", action);
      return {
        ...state,
        todoList: state.todoList.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              status: action.payload.status,
            };
          } else {
            return item;
          }
        }),
        // todoList: state.todoList.map((item) =>
        //   item.id === action.payload.id
        //     ? (item.status = action.payload.status)
        //     : item
        // ),
      };
    }
    default:
      return state;
  }
};

export default todoReducer;
