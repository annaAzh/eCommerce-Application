import { RootState } from 'app/providers/storeProvider';

export const getCartError = (state: RootState) => {
  return state.cart.error;
};
