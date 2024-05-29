import { Reducer } from '@reduxjs/toolkit';
import { NotificationToolSchema } from 'entities/NotificationTool';
import { CatalogSchema } from 'features/Catalog';
import { UserSchema } from 'entities/User';
import { ProfileSchema } from 'features/EditProfile';
import { LoginSchema } from 'features/LoginUser';
import { RegisterSchema } from 'features/RegistrationUser';
import { CardSchema } from 'features/SelectedProduct';

export interface StateSchema {
  user: Reducer<UserSchema>;
  login: Reducer<LoginSchema>;
  auth: Reducer<RegisterSchema>;
  notification: Reducer<NotificationToolSchema>;
  profile: Reducer<ProfileSchema>;
  catalog: Reducer<CatalogSchema>;
  card: Reducer<CardSchema>;
}
