import { RootState } from 'app/providers/storeProvider';
import { Cart } from '../types/cartTypes';
import { getCart } from './getCart';

const cart: Partial<Cart> = {
  id: 'test',
  version: 1,
};

const initialState: DeepPartial<RootState> = {
  cart: {
    cart,
  },
};

const state = initialState as RootState;

test('test getCart should be equal to test data', () => {
  expect(getCart(state)).toEqual(cart);
});
