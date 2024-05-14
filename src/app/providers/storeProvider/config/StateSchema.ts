import { Reducer } from '@reduxjs/toolkit';
import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/LoginUser';
import { RegisterSchema } from 'features/RegistrationUser';

export interface StateSchema {
  userAccessToken: Reducer<UserSchema>;
  login: Reducer<LoginSchema>;
  auth: Reducer<RegisterSchema>;
}
