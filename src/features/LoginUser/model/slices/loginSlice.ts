import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RefreshTokenSucces, LoginSchema, ErrorDataResponse } from '../types/loginTypes';
import { requestLogin } from '../services/requestLogin';

const initialState: LoginSchema = {
  customerId: undefined,
  isLoading: false,
  error: undefined,
  responeId: Math.random(),
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(requestLogin.fulfilled, (state, action: PayloadAction<RefreshTokenSucces>) => {
        state.isLoading = false;
        state.error = undefined;
        state.customerId = action.payload.customer.id;
      })
      .addCase(requestLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(requestLogin.rejected, (state, action: PayloadAction<unknown>) => {
        state.isLoading = false;
        state.error = action.payload as ErrorDataResponse;
        state.responeId = Math.random();
      });
  },
});

export const { reducer: loginReducer } = loginSlice;
