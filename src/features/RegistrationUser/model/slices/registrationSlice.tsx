import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { register } from '../services/requestRegistration';
import { ErrorRegistretionDataResponse, RegisterSchema } from '../types/registrationTypes';
import { RefreshTokenSucces } from '../types/registrationTypes';

const initialState: RegisterSchema = {
  customerId: undefined,
  isLoading: false,
  error: undefined,
  responeId: Math.random(),
};

export const RegisterSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    clearRegisterError(state: RegisterSchema) {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action: PayloadAction<RefreshTokenSucces>) => {
        state.isLoading = false;
        state.error = undefined;
        state.customerId = action.payload.customer.id;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.rejected, (state, action: PayloadAction<unknown>) => {
        state.isLoading = false;
        state.error = action.payload as ErrorRegistretionDataResponse;
        state.responeId = Math.random();
      });
  },
});

export const { clearRegisterError } = RegisterSlice.actions;

export const { reducer: registerReducer } = RegisterSlice;
