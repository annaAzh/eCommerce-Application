import { combineReducers } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { userReducer } from 'entities/User';
import { loginReducer } from 'features/LoginUser';
import { notificationReducer } from 'entities/NotificationTool';
import { registerReducer } from 'features/RegistrationUser';
import { productReducer } from 'entities/Product';
import { profileReducer } from 'features/EditProfile';

export const rootReducer = combineReducers<StateSchema>({
  user: userReducer,
  login: loginReducer,
  auth: registerReducer,
  notification: notificationReducer,
  product: productReducer,
  profile: profileReducer,
});
