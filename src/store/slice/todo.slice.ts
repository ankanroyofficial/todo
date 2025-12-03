import { showMessage } from '@app/utils/helpers/Toast';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ToDoState {
  loading: boolean;
  toDoList: any[];
  productList: any[];
  wishList: any[];
}

const initialState: ToDoState = {
  loading: true,
  toDoList: [],
  productList: [],
  wishList: [],
};

const toDoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    storeToDoListData(state, action) {
      state.toDoList = action.payload;
    },
    storeProductListData(state, action) {
      state.productList = action.payload;
    },

    storeWishListData(state, action) {
      const newItem = action.payload;
      // Check item exists
      const exists = state.wishList.some(item => item.id === newItem.id);
      if (exists) {
        // Remove item
        state.wishList = state.wishList.filter(item => item.id !== newItem.id);
        showMessage('Product removed from wishlist.');
      } else {
        // Add item
        state.wishList = [...state.wishList, newItem];
        showMessage('Product added successfully.');
      }
    },

    resetAllToDoData: () => initialState,
  },
});

export const {
  resetAllToDoData,
  storeToDoListData,
  storeProductListData,
  storeWishListData,
} = toDoSlice.actions;
export default toDoSlice.reducer;
