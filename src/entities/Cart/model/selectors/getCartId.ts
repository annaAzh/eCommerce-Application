import { RootState } from 'app/providers/storeProvider';

export const getCart = (state: RootState) => {
  return state.cart.cart;
};
