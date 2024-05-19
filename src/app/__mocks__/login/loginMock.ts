import { LoginSchema } from 'features/LoginUser';

const initialLoginState: LoginSchema = {
  customerId: undefined,
  isLoading: false,
  error: { header: 'test', message: 'another test' },
  responeId: Math.random(),
};
export { initialLoginState };
