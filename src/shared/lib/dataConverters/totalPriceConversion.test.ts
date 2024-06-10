import { PriceFormat } from 'shared/types';
import { totalPriceConversion } from './totalPriceConversion';

const testData: PriceFormat = {
  centAmount: 5999,
  currencyCode: 'USD',
  fractionDigits: 2,
};

const totalPrice = '59.99$';

test('test totalPriceConversion', () => {
  const result = totalPriceConversion(testData);
  expect(result).toBe(totalPrice);
});
