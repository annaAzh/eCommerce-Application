import { getSubCategory } from './getSubCategory';

const categories = [
  {
    id: 'birds',
    name: 'Birds',
    subCategory: [
      { id: 'parrot', name: 'Parrot' },
      { id: 'sparrow', name: 'Sparrow' },
    ],
  },
  {
    id: 'fish',
    name: 'Fish',
    subCategory: [
      { id: 'goldfish', name: 'Goldfish' },
      { id: 'betta', name: 'Betta' },
    ],
  },
];
const firstId = 'parrot';
const secondId = undefined;

test('test getSubCategory', () => {
  const result = getSubCategory(categories, firstId, secondId);
  expect(result).toBe(firstId);
});
