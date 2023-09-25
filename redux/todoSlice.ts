import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { v4 as uuidv4 } from 'uuid';
import { TaskState } from '@/types/types';

//Defining our initialState's type
type initialStateType = {
  taskList: TaskState[];
};

const taskList: TaskState[] = [
  {
    id: uuidv4(),
    task: 'Code a todo list',
    completed: false,
  },
  {
    id: uuidv4(),
    task: "Meet friend for lunch",
    completed: true,
  },
  {
    id: uuidv4(),
    task: 'Meet Mr.Khanh Mentor',
    completed: true,
  },
];

const initialState: initialStateType = {
    taskList,
};

export const todoSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addNewTask: (state, action: PayloadAction<TaskState>) => {
      state.taskList.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<TaskState>) => {
      const {
        payload: { task, id, completed },
      } = action;

      state.taskList = state.taskList.map((item) =>
        item.id === id ? { ...item, completed, task } : item,
      );
    },
    deleteTask: (state, action: PayloadAction<{ id: string }>) => {
      state.taskList = state.taskList.filter((item) => item.id !== action.payload.id);
    },
    // getTaskById: (state, action: PayloadAction<{ id: string }>) => {
    //   state.taskList.find((item) => item.id === action.payload.id);
    // }
  },
});

// To able to use reducers we need to export them.
export const { addNewTask, updateTask, deleteTask } = todoSlice.actions;

//Selector to access bookList state.
export const selectTaskList = (state: RootState) => state.todo.taskList;

export default todoSlice.reducer;
