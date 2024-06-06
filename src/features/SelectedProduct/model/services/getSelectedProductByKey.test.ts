import { ProductSelectedResponse } from '../types/selectedProductTypes';
import { convertDataProductIntoAppropriateFormat } from './getSelectedProductByKey';

const product: ProductSelectedResponse = {
  id: 'prod456',
  key: 'cat-bed',
  masterData: {
    staged: {
      description: {
        'en-US': 'A cozy bed designed for the comfort of your feline friend.',
      },
      name: {
        'en-US': 'Soft Kitty Bed',
      },
      masterVariant: {
        images: [
          { dimensions: { w: 200, h: 150 }, url: 'http://example.com/cat-bed-1.jpg' },
          { dimensions: { w: 200, h: 150 }, url: 'http://example.com/cat-bed-2.jpg' },
        ],
        prices: [
          {
            value: {
              centAmount: 2499,
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
          },
        ],
      },
      categories: [
        { id: 'cat789', typeId: 'category' },
        { id: 'subcat101112', typeId: 'category' },
      ],
    },
  },
};

const expectedResult = {
  id: 'prod456',
  key: 'cat-bed',
  name: 'Soft Kitty Bed',
  description: 'A cozy bed designed for the comfort of your feline friend.',
  images: ['http://example.com/cat-bed-1.jpg', 'http://example.com/cat-bed-2.jpg'],
  prices: { currentPrice: '24.99$', discountedPrice: '19.99$' },
  category: 'cat789',
  subCategory: 'subcat101112',
};

test('test convertDataProductIntoAppropriateFormat', () => {
  const result = convertDataProductIntoAppropriateFormat(product);
  expect(result).toEqual(expectedResult);
});
