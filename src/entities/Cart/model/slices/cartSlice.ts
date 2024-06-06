import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Cart, CartSchema } from '../types/cartTypes';
import { createCart } from 'entities/Cart/services/createCart';
import { getExistCart } from 'entities/Cart/services/getExistCart';
import { addToCart } from 'entities/Cart/services/addToCart';

const initialState: CartSchema = {
  cart: {},
  isLoading: false,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart(state: CartSchema) {
      state.cart = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCart.fulfilled, (state, { payload }: PayloadAction<Cart>) => {
        state.cart = payload;
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(createCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCart.rejected, (state, { payload }: PayloadAction<unknown>) => {
        state.isLoading = false;
        state.error = payload as string;
      })
      .addCase(getExistCart.fulfilled, (state, { payload }: PayloadAction<Cart>) => {
        state.cart = payload;
      })
      .addCase(addToCart.fulfilled, (state, { payload }: PayloadAction<Cart>) => {
        state.cart = payload;
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.rejected, (state, { payload }: PayloadAction<unknown>) => {
        state.isLoading = false;
        state.error = payload as string;
      });
  },
});

export const { reducer: cartReducer } = cartSlice;

export const { clearCart } = cartSlice.actions;
