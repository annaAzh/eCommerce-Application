import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RefreshTokenSucces, LoginSchema, ErrorDataResponse } from '../types/loginTypes';
import { requestLogin } from '../services/requestLogin';

const initialState: LoginSchema = {
  customerId: undefined,
  isLoading: false,
  error: undefined,
  responseId: Math.random(),
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    clearLoginError(state: LoginSchema) {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestLogin.fulfilled, (state, action: PayloadAction<RefreshTokenSucces>) => {
        state.isLoading = false;
        state.error = undefined;
        state.customerId = action.payload.customer.id;
        state.responseId = Math.random();
      })
      .addCase(requestLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(requestLogin.rejected, (state, action: PayloadAction<unknown>) => {
        state.isLoading = false;
        state.error = action.payload as ErrorDataResponse;
        state.responseId = Math.random();
      });
  },
});

export const { clearLoginError } = loginSlice.actions;

export const { reducer: loginReducer } = loginSlice;
