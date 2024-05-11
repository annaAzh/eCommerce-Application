import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { requestAccessToken } from 'shared/api/actions/actionCreators/requestAccessToken';
import { AccessTokenSuccess, Token } from 'shared/api/actions/types/tokenTypes';

const initialState: Token = {
  token: '',
  isLoading: false,
  error: '',
};

export const userAccessTokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(requestAccessToken.fulfilled, (state, action: PayloadAction<AccessTokenSuccess>) => {
        state.isLoading = false;
        state.error = '';
        state.token = action.payload.access_token;
      })
      .addCase(requestAccessToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(requestAccessToken.rejected, (state, action: PayloadAction<unknown>) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});
