import { GetProductResponse } from '../types/productTypes';
import { convertParseData } from './getProductsForParsing';

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
        attributes: [
          { name: 'Type', value: 'Dry' },
          { name: 'Flavor', value: 'Beef' },
        ],
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
        attributes: [
          { name: 'Material', value: 'Plastic' },
          { name: 'Feature', value: 'Interactive' },
        ],
      },
    },
  ],
};

const expectedResults = {
  attributes: {
    Type: ['Dry'],
    Flavor: ['Beef'],
    Material: ['Plastic'],
    Feature: ['Interactive'],
  },
  priceRange: {
    min: 9.99,
    max: 18.99,
  },
};

test('test getProductsForParsing', () => {
  const result = convertParseData(products);
  expect(result).toEqual(expectedResults);
});
