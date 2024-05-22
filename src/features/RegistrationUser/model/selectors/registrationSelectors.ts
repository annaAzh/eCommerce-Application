import { RootState } from 'app/providers/storeProvider';
import { ErrorRegistretionDataResponse } from '../types/registrationTypes';

const getRegistrationCustomerId = (state: RootState): string | undefined => {
  return state.auth.customerId;
};

const getRegisterError = (state: RootState): ErrorRegistretionDataResponse | undefined => {
  return state.auth.error;
};

export { getRegistrationCustomerId, getRegisterError };
