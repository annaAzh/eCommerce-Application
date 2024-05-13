import { combineReducers } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { userAccessTokenReducer } from 'entities/User';
import { loginReducer } from 'features/LoginUser';

export const rootReducer = combineReducers<StateSchema>({
  userAccessToken: userAccessTokenReducer,
  login: loginReducer,
});
