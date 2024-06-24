import { Prices } from 'shared/types';
import { setPrices } from './setPrices';

const testData: Prices = {
  value: {
    centAmount: 2999,
    currencyCode: 'USD',
    fractionDigits: 2,
  },
  discounted: {
    value: {
      centAmount: 1999,
      currencyCode: 'USD',
      fractionDigits: 2,
    },
  },
};

const expectedResult = {
  currentPrice: '29.99$',
  discountedPrice: '19.99$',
};

describe('test setPrices', () => {
  const result = setPrices(testData);
  it('currentPrice must be equal expectedResult', () => {
    expect(result.currentPrice).toBe(expectedResult.currentPrice);
  });
  it('discountedPrice must be equal expectedResult', () => {
    expect(result.discountedPrice).toBe(expectedResult.discountedPrice);
  });
});
