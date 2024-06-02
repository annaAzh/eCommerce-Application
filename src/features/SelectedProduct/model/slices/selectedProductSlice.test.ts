import { getProductByKey } from '../services/getSelectedProductByKey';
import { CardSchema, ProductReject } from '../types/selectedProductTypes';
import { cardReducer, clearCardError } from './selectedProductSlice';
import { Product } from 'shared/types';

const product = {
  id: '21',
  key: 'abs',
  name: 'test',
  description: 'asd adasds',
  images: ['image1', 'image2'],
  prices: { currentPrice: '12$' },
};

const errorMock: ProductReject = {
  statusCode: 404,
  message: 'not found',
  errors: [
    {
      code: 'NOT_FOUND',
      message: 'test',
    },
  ],
};

const initialState: CardSchema = {
  product,
  isLoading: true,
  error: errorMock,
};
describe('testing selected product slice', () => {
  it('should return default state', () => {
    const state = cardReducer(initialState, { type: '' });
    expect(state).toEqual(initialState);
  });
  it('should return undefined', () => {
    const state = cardReducer(initialState, { type: clearCardError.type });
    expect(state).not.toEqual(initialState);
    expect(state.error).toBeUndefined();
  });
  it('test getProductByKey/fulfilled', () => {
    const payload: Product = {
      id: '123',
      key: 'ab',
      name: 'anopther test',
      description: 'asd',
      images: ['1', '2'],
      prices: { currentPrice: '123$' },
    };
    const data = { token: 'test', productKey: '123' };
    const state = cardReducer(initialState, getProductByKey.fulfilled(payload, 'getProductByKey/fulfilled', data));
    expect(state.error).toBeUndefined();
    expect(state.isLoading).toBeFalsy();
    expect(state.product).toEqual(payload);
  });
  it('test getProductByKey/pending', () => {
    const data = { token: 'test', productKey: '123' };
    const state = cardReducer(initialState, getProductByKey.pending('getProductByKey/pending', data));
    expect(state.isLoading).toBeTruthy();
  });
});
