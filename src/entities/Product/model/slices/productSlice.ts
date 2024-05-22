import { createSlice } from '@reduxjs/toolkit';
import { ProductSchema } from '../types/productTypes';

const initialState: ProductSchema = {
  isLoading: false,
  error: undefined,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
});

export const { reducer: productReducer } = productSlice;

export const {} = productSlice.actions;
