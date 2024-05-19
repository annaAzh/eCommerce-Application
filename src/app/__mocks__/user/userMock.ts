import { UserSchema } from 'entities/User';

const initialUserState: UserSchema = {
  user: {
    isLogined: false,
    accessToken: undefined,
  },
  isLoading: false,
  error: undefined,
};

export { initialUserState };
