import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CatalogSchema } from '../types/catalogTypes';
import { getAllProducts } from '../services/getAllProducts';
import { Product } from 'shared/types';

const initialState: CatalogSchema = {
  products: [],
  isLoading: false,
  error: undefined,
};

export const catalogSlice = createSlice({
  name: 'catalog',
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

export const { reducer: catalogReducer } = catalogSlice;
