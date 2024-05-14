import { Reducer } from '@reduxjs/toolkit';
import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/LoginUser';

export interface StateSchema {
  userAccessToken: Reducer<UserSchema>;
  login: Reducer<LoginSchema>;
}
