import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RefreshTokenSucces, Token } from 'shared/api/actions/types/tokenTypes';
import { requestRefreshToken } from 'shared/api/actions/actionCreators/requestRefreshToken';

const initialState: Token = {
  token: '',
  isLoading: false,
  error: '',
};

export const userRefreshTokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(requestRefreshToken.fulfilled, (state, action: PayloadAction<RefreshTokenSucces>) => {
        state.isLoading = false;
        state.error = '';
        state.token = action.payload.refresh_token;
      })
      .addCase(requestRefreshToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(requestRefreshToken.rejected, (state, action: PayloadAction<unknown>) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});
