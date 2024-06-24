import { GetProductResponse } from '../types/productTypes';
import { convertDataIntoAppropriateFormat } from './getAllProducts';

const products: GetProductResponse = {
  results: [
    {
      id: 'prod-dogfood',
      key: 'dog-food',
      description: {
        'en-US': '<p>Complete nutrition for adult dogs.</p>',
      },
      name: {
        'en-US': 'Premium Dog Food',
      },
      masterVariant: {
        images: [
          { url: 'https://example.com/dog-food-image1.jpg', dimensions: { h: 1000, w: 1000 } },
          { url: 'https://example.com/dog-food-image2.jpg', dimensions: { h: 1000, w: 1000 } },
        ],
        prices: [
          {
            value: { centAmount: 2099, currencyCode: 'USD', fractionDigits: 2 },
            discounted: { value: { centAmount: 1899, currencyCode: 'USD', fractionDigits: 2 } },
          },
        ],
        attributes: [],
      },
    },
    {
      id: 'prod-cattoy',
      key: 'cat-toy',
      description: {
        'en-US': '<p>Keeps your cat entertained for hours.</p>',
      },
      name: {
        'en-US': 'Interactive Cat Toy',
      },
      masterVariant: {
        images: [
          { url: 'https://example.com/cat-toy-image1.jpg', dimensions: { h: 500, w: 500 } },
          { url: 'https://example.com/cat-toy-image2.jpg', dimensions: { h: 500, w: 500 } },
        ],
        prices: [{ value: { centAmount: 999, currencyCode: 'USD', fractionDigits: 2 } }],
        attributes: [],
      },
    },
  ],
  total: 2,
};

const expectedResult = {
  result: [
    {
      id: 'prod-dogfood',
      key: 'dog-food',
      name: 'Premium Dog Food',
      description: 'Complete nutrition for adult dogs.',
      images: ['https://example.com/dog-food-image1.jpg', 'https://example.com/dog-food-image2.jpg'],
      prices: {
        currentPrice: '20.99$',
        discountedPrice: '18.99$',
      },
    },
    {
      id: 'prod-cattoy',
      key: 'cat-toy',
      name: 'Interactive Cat Toy',
      description: 'Keeps your cat entertained for hours.',
      images: ['https://example.com/cat-toy-image1.jpg', 'https://example.com/cat-toy-image2.jpg'],
      prices: {
        currentPrice: '9.99$',
      },
    },
  ],
  total: 2,
};

test('test convertDataIntoAppropriateFormat', () => {
  const result = convertDataIntoAppropriateFormat(products);
  expect(result).toEqual(expectedResult);
});
