import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosCustomize from '../utils/axiosCustomize';

const initialState = {
  cart: null
};
export const fetchCartAPIs = createAsyncThunk(
    'cart/fetchCartAPIs',
    async () => {
        return await axiosCustomize.get(`/cart`);
    }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart : (state, action) => {
        state.cart = action.payload;
    },

  },
  extraReducers: (builder) => {
      builder.addCase(fetchCartAPIs.fulfilled, ({state, action}: any) => {
        state.cart = action.payload;
      })
  }
});

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
