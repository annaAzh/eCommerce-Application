import { RootState } from 'app/providers/storeProvider';
import { ErrorDataResponse } from '../types/loginTypes';

const getLoginCustomerId = (state: RootState): string | undefined => {
  return state.login.customerId;
};

const getLoginError = (state: RootState): ErrorDataResponse | undefined => {
  return state.login.error;
};

const getLoginResponseId = (state: RootState): number => {
  return state.login.responseId;
};

export { getLoginCustomerId, getLoginError, getLoginResponseId };
