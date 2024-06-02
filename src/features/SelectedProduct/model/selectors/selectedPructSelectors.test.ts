import { RootState } from 'app/providers/storeProvider';
import { getSelectedError, getSelectedIsLoading, getSelectedProduct } from './selectedProductSelectors';
import { ProductReject } from '../types/selectedProductTypes';

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

const initialState: DeepPartial<RootState> = {
  card: {
    product,
    isLoading: true,
    error: errorMock,
  },
};

const state = initialState as RootState;

describe('testing product selectors', () => {
  it('test getSelectedProduct', () => {
    expect(getSelectedProduct(state)).toEqual(product);
  });
  it('test getSelectedIsLoading', () => {
    expect(getSelectedIsLoading(state)).toBeTruthy();
  });
  it('test getSelectedError', () => {
    expect(getSelectedError(state)).toEqual(errorMock);
  });
});
