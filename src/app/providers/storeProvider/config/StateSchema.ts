import { Reducer } from '@reduxjs/toolkit';
import { NotificationToolSchema } from 'entities/NotificationTool';
import { CatalogSchema } from 'features/Catalog';
import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/LoginUser';
import { RegisterSchema } from 'features/RegistrationUser';
import { ProductSchema } from 'features/SelectedProduct';

export interface StateSchema {
  user: Reducer<UserSchema>;
  login: Reducer<LoginSchema>;
  auth: Reducer<RegisterSchema>;
  notification: Reducer<NotificationToolSchema>;
  catalog: Reducer<CatalogSchema>;
  product: Reducer<ProductSchema>;
}
