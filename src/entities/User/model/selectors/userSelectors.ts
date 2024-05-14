import { UserSchema } from '../types/userTypes';

export const getAccessToken = (state: UserSchema) => {
  return state.user.accessToken;
};
