import { combineReducers } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { userReducer } from 'entities/User';
import { loginReducer } from 'features/LoginUser';
import { notificationReducer } from 'entities/NotificationTool';
import { registerReducer } from 'features/RegistrationUser';
import { profileReducer } from 'features/EditProfile';
import { cardReducer } from 'features/SelectedProduct';
import { productReducer } from 'entities/Product';

export const rootReducer = combineReducers<StateSchema>({
  user: userReducer,
  login: loginReducer,
  auth: registerReducer,
  notification: notificationReducer,
  profile: profileReducer,
  product: productReducer,
  card: cardReducer,
});
