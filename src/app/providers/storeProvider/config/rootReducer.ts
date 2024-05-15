import { combineReducers } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { userAccessTokenReducer } from 'entities/User';
import { loginReducer } from 'features/LoginUser';
import { registerReducer } from 'features/RegistrationUser/model/slices/registrationSlice';

export const rootReducer = combineReducers<StateSchema>({
  userAccessToken: userAccessTokenReducer,
  login: loginReducer,
  auth: registerReducer,
});
