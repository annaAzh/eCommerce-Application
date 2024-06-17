import { PromoCode, PromoCodeResponse } from '../types/promoCodesTypes';
import { changeFormatOfIncomingData } from './getPromoCodes';

const code: PromoCode = {
  code: 'abs',
  description: {
    'en-US': 'test',
  },
  isApply: true,
};

const response: PromoCodeResponse = { results: [code] };

const expectedResult = [
  {
    code: 'abs',
    description: {
      'en-US': 'test',
    },
    isApply: false,
  },
];

test('test getBreadcrumbPaths', () => {
  const result = changeFormatOfIncomingData(response);
  expect(result).toEqual(expectedResult);
});
