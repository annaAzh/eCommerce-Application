import { combineReducers } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { userAccessTokenSlice } from 'features/LoginUser/model/services/userAccessTokenSlice';
import { userRefreshTokenSlice } from 'features/LoginUser/model/services/userRefreshTokenSlice';

export const rootReducer = combineReducers<StateSchema>({
  accessToken: userAccessTokenSlice.reducer,
  refreshToken: userRefreshTokenSlice.reducer,
});
