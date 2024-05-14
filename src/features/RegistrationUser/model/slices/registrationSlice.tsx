import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { register } from '../services/requestRegistration';
import { RegisterSchema } from '../types/registrationTypes';
import { RefreshTokenSucces } from '../types/registrationTypes';

const initialState: RegisterSchema = {
  customerId: undefined,
  isLoading: false,
  error: undefined,
};

export const RegisterSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {},
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
        state.error = action.payload as string;
      });
  },
});

export const { reducer: registerReducer } = RegisterSlice;
