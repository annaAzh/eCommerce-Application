import { UserSchema } from 'entities/User';

const initialUserState: UserSchema = {
  user: {
    isLogined: false,
  },
  isLoading: false,
  error: undefined,
};

export { initialUserState };
