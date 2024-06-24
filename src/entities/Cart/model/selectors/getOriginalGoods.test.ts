import { RootState } from 'app/providers/storeProvider';
import { Cart, LineItem } from '../types/cartTypes';
import { getOriginalGoods } from './getOriginalGoods';

const item1: LineItem = {
  id: 'item1',
  name: { 'en-US': 'Dog Food' },
  price: {
    value: {
      centAmount: 2000,
      currencyCode: 'USD',
      fractionDigits: 2,
    },
    discounted: {
      value: {
        centAmount: 1800,
        currencyCode: 'USD',
        fractionDigits: 2,
      },
    },
  },
  productId: 'prod1',
  quantity: 2,
  totalPrice: {
    centAmount: 3600,
    currencyCode: 'USD',
    fractionDigits: 2,
  },
  variant: {
    images: [
      {
        dimensions: {
          h: 100,
          w: 100,
        },
        url: 'http://example.com/dogfood.jpg',
      },
    ],
  },
};
const item2: LineItem = {
  id: 'item2',
  name: { 'en-US': 'Cat Toy' },
  price: {
    value: {
      centAmount: 1000,
      currencyCode: 'USD',
      fractionDigits: 2,
    },
  },
  productId: 'prod2',
  quantity: 1,
  totalPrice: {
    centAmount: 1000,
    currencyCode: 'USD',
    fractionDigits: 2,
  },
  variant: {
    images: [
      {
        dimensions: {
          h: 50,
          w: 50,
        },
        url: 'http://example.com/cattoy.jpg',
      },
    ],
  },
};

const lineItems: LineItem[] = [item1, item2];

const cart: Partial<Cart> = {
  lineItems,
};

const initialState: DeepPartial<RootState> = {
  cart: {
    cart,
  },
};

const state = initialState as RootState;

test('test getOriginalGoods should be equal to test data', () => {
  expect(getOriginalGoods(state).get('prod1')).toEqual('item1');
  expect(getOriginalGoods(state).get('prod2')).toEqual('item2');
});
