import { combineReducers } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { userAccessTokenReducer } from 'entities/User';
import { loginReducer } from 'features/LoginUser';
import { notificationReducer } from 'entities/NotificationTool';
import { registerReducer } from 'features/RegistrationUser';

export const rootReducer = combineReducers<StateSchema>({
  userAccessToken: userAccessTokenReducer,
  login: loginReducer,
  auth: registerReducer,
  notification: notificationReducer,
});
