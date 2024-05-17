import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserSchema } from '../types/userTypes';
import { AccessTokenSuccess, PasswordFlowSuccess } from '../types/tokenTypes';
import { requestAccessToken } from '../services/requestAccessToken';
import { passwordFlow } from '../services/passwordFlow';
import { setLocalStoreState } from 'shared/lib/storeState/storeState';

const initialState: UserSchema = {
  user: {
    isLogined: false,
  },
  isLoading: false,
  error: undefined,
};

export const userAccessTokenSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId(state: UserSchema, action: PayloadAction<string>) {
      state.user.userId = action.payload;
    },
    setUserIsLoginedStatus(state: UserSchema, action: PayloadAction<boolean>) {
      state.user.isLogined = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestAccessToken.fulfilled, (state, { payload }: PayloadAction<AccessTokenSuccess>) => {
        state.isLoading = false;
        state.error = undefined;
        state.user.accessToken = payload.access_token;
      })
      .addCase(requestAccessToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(requestAccessToken.rejected, (state, { payload }: PayloadAction<unknown>) => {
        state.isLoading = false;
        state.error = payload as string;
      })
      .addCase(passwordFlow.fulfilled, (state, { payload }: PayloadAction<PasswordFlowSuccess>) => {
        state.isLoading = false;
        state.error = undefined;
        state.user.accessToken = payload.access_token;
        setLocalStoreState(state.user.accessToken);
        state.user.isLogined = true;
      })
      .addCase(passwordFlow.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(passwordFlow.rejected, (state, { payload }: PayloadAction<unknown>) => {
        state.isLoading = false;
        state.error = payload as string;
      });
  },
});

export const { reducer: userAccessTokenReducer } = userAccessTokenSlice;

export const { setUserId, setUserIsLoginedStatus } = userAccessTokenSlice.actions;
