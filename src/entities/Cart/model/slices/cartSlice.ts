import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Cart, CartSchema } from '../types/cartTypes';
import { createCart } from 'entities/Cart/model/services/createCart';
import { getExistCart } from 'entities/Cart/model/services/getExistCart';
import { addToCart } from 'entities/Cart/model/services/addToCart';
import { removeFromCart } from 'entities/Cart/model/services/removeFromCart';
import { clearRemoteCart } from 'entities/Cart/model/services/clearRemoteCart';
import { applyPromoCode } from '../services/applyPromoCode';

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
      })
      .addCase(removeFromCart.fulfilled, (state, { payload }: PayloadAction<Cart>) => {
        state.cart = payload;
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFromCart.rejected, (state, { payload }: PayloadAction<unknown>) => {
        state.isLoading = false;
        state.error = payload as string;
      })
      .addCase(clearRemoteCart.fulfilled, (state, { payload }: PayloadAction<Cart>) => {
        state.cart = payload;
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(clearRemoteCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(clearRemoteCart.rejected, (state, { payload }: PayloadAction<unknown>) => {
        state.isLoading = false;
        state.error = payload as string;
      })
      .addCase(applyPromoCode.fulfilled, (state, { payload }: PayloadAction<Cart>) => {
        state.cart = payload;
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(applyPromoCode.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(applyPromoCode.rejected, (state, { payload }: PayloadAction<unknown>) => {
        state.isLoading = false;
        state.error = payload as string;
      });
  },
});

export const { reducer: cartReducer } = cartSlice;

export const { clearCart } = cartSlice.actions;
