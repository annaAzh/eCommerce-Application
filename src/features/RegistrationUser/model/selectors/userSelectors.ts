import { RegisterSchema } from '../types/registrationTypes';

export const getUserId = (state: RegisterSchema) => {
  return state.customerId;
};
