import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProductReject, ProductSchema } from '../types/selectedProductTypes';
import { Product } from 'shared/types';
import { getProductByKey } from '../services/getSelectedProductByKey';

const initialState: ProductSchema = {
  product: {
    id: '',
    key: '',
    name: '',
    description: '',
    images: [],
    prices: { currentPrice: '' },
  },
  isLoading: false,
  error: undefined,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearProductError(state: ProductSchema) {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductByKey.fulfilled, (state, { payload }: PayloadAction<Product>) => {
        state.product = payload;
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(getProductByKey.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductByKey.rejected, (state, { payload }: PayloadAction<unknown>) => {
        state.isLoading = false;
        state.error = payload as ProductReject;
      });
  },
});

export const { reducer: productReducer } = productSlice;
export const { clearProductError } = productSlice.actions;
