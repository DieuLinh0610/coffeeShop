import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosCustomize from '../utils/axiosCustomize';
const initialState = {
  cart: null
};


export const fetchCart = createAsyncThunk(
  'cart/fetchCartAPIs',
  async () => {
    return await axiosCustomize.get(`/cart`);
  }
)
export const addCart = createAsyncThunk(
  'cart/addCartAPIs',
  async ({ userId, productId, quantity }: any) => {
    
    return   await axiosCustomize.post(`/cart/add`, {
      userId: userId,
      items: [{ productId, quantity }],
    });
  }
)

export const updateQuanityCart = createAsyncThunk(
  'cart/updateQuanityCartAPIs',
  async ({ userId, productId,quantity }: any) => {
    console.log(userId,productId,quantity);
    
    return await axiosCustomize.put(`/cart/update`, {
      userId: userId,
      productId: productId,
      quantity: quantity,
    });
  }
)

export const removeCart = createAsyncThunk(
  'cart/removeCartAPIs',
  async ({ userId, productId}: any) => {
    
    return   await axiosCustomize.post(`/cart/remove`, {
      userId: userId,
      productId: productId
    });
  }
)
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, action: any) => {
      state.cart = action.payload
    }),
      builder.addCase(addCart.fulfilled, (state, action: any) => {
        state.cart = action.payload
      }),
      builder.addCase(updateQuanityCart.fulfilled, (state, action: any) => {
        state.cart = action.payload
      }),
      builder.addCase(removeCart.fulfilled, (state, action: any) => {
        state.cart = action.payload
      })
  }
});

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;