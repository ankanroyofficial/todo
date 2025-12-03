import { createSlice } from '@reduxjs/toolkit';

interface ProductState {
  loading: boolean;
  productList: any[];
}

const initialState: ProductState = {
  loading: true,
  productList: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    storeProductListData(state, action) {
      state.productList = action.payload;
    },
    resetAllProductData: () => initialState,
  },
});

export const { resetAllProductData, storeProductListData } =
  productSlice.actions;
export default productSlice.reducer;
