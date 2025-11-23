import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ToDoState {
  loading: boolean;
  toDoList: any[];
}

const initialState: ToDoState = {
  loading: true,
  toDoList: [],
};

const toDoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    storeToDoListData(state, action) {
      state.toDoList = action.payload;
    },
    resetAllToDoData: () => initialState,
  },
});

export const { resetAllToDoData, storeToDoListData } = toDoSlice.actions;
export default toDoSlice.reducer;
