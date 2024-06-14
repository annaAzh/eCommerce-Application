import { GetCategoriesResponse } from '../types/productTypes';
import { convertCategoriesIntoAppropriateFormat } from './getAvailableCategories';

const testData: GetCategoriesResponse = {
  results: [
    { id: '1', name: { 'en-US': 'Pets' } },
    { id: '2', name: { 'en-US': 'Dogs' }, parent: { id: '1' } },
  ],
};

const expectedResults = [
  {
    id: '1',
    name: 'Pets',
    subCategory: [
      {
        id: '2',
        name: 'Dogs',
      },
    ],
  },
];

test('test convertCategoriesIntoAppropriateFormat', () => {
  const result = convertCategoriesIntoAppropriateFormat(testData);
  expect(result).toEqual(expectedResults);
});
