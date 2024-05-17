import { RootState } from 'app/providers/storeProvider';

const getRegistrationCustomerId = (state: RootState): string | undefined => {
  return state.login.customerId;
};

export { getRegistrationCustomerId };
