import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PromoCode, PromoCodeReject, PromoCodeSchema } from '../types/promoCodesTypes';
import { getPromoCodes } from '../services/getPromoCodes';

const initialState: PromoCodeSchema = {
  promoCodes: [],
  isLoading: false,
  error: undefined,
};

export const cardSlice = createSlice({
  name: 'promoCode',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPromoCodes.fulfilled, (state, { payload }: PayloadAction<PromoCode[]>) => {
        state.promoCodes = payload;
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(getPromoCodes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPromoCodes.rejected, (state, { payload }: PayloadAction<unknown>) => {
        state.isLoading = false;
        state.error = payload as PromoCodeReject;
      });
  },
});

export const { reducer: promoCodeReducer } = cardSlice;
