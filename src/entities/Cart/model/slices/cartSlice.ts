import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Cart, CartSchema } from '../types/cartTypes';
import { createCart } from '../services/createCart';
import { getExistCart } from '../services/getExistCart';
import { addToCart } from '../services/addToCart';
import { removeFromCart } from '../services/removeFromCart';
import { clearRemoteCart } from '../services/clearRemoteCart';
import { applyPromoCode } from '../services/applyPromoCode';
import { removePromoCode } from '../services/removePromoCode';

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
    clearCartError(state: CartSchema) {
      state.error = undefined;
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
      })
      .addCase(removePromoCode.fulfilled, (state, { payload }: PayloadAction<Cart>) => {
        state.cart = payload;
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(removePromoCode.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removePromoCode.rejected, (state, { payload }: PayloadAction<unknown>) => {
        state.isLoading = false;
        state.error = payload as string;
      });
  },
});

export const { reducer: cartReducer } = cartSlice;

export const { clearCart, clearCartError } = cartSlice.actions;
