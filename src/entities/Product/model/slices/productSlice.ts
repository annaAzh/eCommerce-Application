import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product, ProductSchema } from '../types/productTypes';
import { getAllProducts } from '../services/getAllProducts';

const initialState: ProductSchema = {
  products: [],
  isLoading: false,
  error: undefined,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.fulfilled, (state, { payload }: PayloadAction<Product[]>) => {
        state.products = payload;
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.rejected, (state, { payload }: PayloadAction<unknown>) => {
        state.isLoading = false;
        state.error = payload as string;
      });
  },
});

export const { reducer: productReducer } = productSlice;

export const {} = productSlice.actions;
