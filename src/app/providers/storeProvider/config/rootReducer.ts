import { combineReducers } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { userReducer } from 'entities/User';
import { loginReducer } from 'features/LoginUser';
import { notificationReducer } from 'entities/NotificationTool';
import { registerReducer } from 'features/RegistrationUser';
import { catalogReducer } from 'features/Catalog';
import { productReducer } from 'features/Product';

export const rootReducer = combineReducers<StateSchema>({
  user: userReducer,
  login: loginReducer,
  auth: registerReducer,
  notification: notificationReducer,
  catalog: catalogReducer,
  product: productReducer,
});
