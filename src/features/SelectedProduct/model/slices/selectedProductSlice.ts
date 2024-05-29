import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProductReject, CardSchema } from '../types/selectedProductTypes';
import { Product } from 'shared/types';
import { getProductByKey } from '../services/getSelectedProductByKey';

const initialState: CardSchema = {
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

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    clearCardError(state: CardSchema) {
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

export const { reducer: cardReducer } = cardSlice;
export const { clearCardError } = cardSlice.actions;
