import { Reducer } from '@reduxjs/toolkit';
import { CartSchema } from 'entities/Cart';
import { NotificationToolSchema } from 'entities/NotificationTool';
import { ProductSchema } from 'entities/Product';
import { UserSchema } from 'entities/User';
import { ProfileSchema } from 'features/EditProfile';
import { LoginSchema } from 'features/LoginUser';
import { RegisterSchema } from 'features/RegistrationUser';
import { CardSchema } from 'features/SelectedProduct';
import { PromoCodeSchema } from 'features/DisplayPromoCode';

export interface StateSchema {
  user: Reducer<UserSchema>;
  login: Reducer<LoginSchema>;
  auth: Reducer<RegisterSchema>;
  notification: Reducer<NotificationToolSchema>;
  profile: Reducer<ProfileSchema>;
  product: Reducer<ProductSchema>;
  card: Reducer<CardSchema>;
  cart: Reducer<CartSchema>;
  promoCode: Reducer<PromoCodeSchema>;
}
