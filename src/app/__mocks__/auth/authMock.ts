import { RegisterSchema } from 'features/RegistrationUser';

const initialRegisterationState: RegisterSchema = {
  customerId: undefined,
  isLoading: false,
  error: undefined,
};

export { initialRegisterationState };
