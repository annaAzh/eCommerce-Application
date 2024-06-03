import { FormattedCategories } from 'shared/types/productTypes';
import { getBreadcrumbPaths } from './getBreadcrumbPaths';

const categories: FormattedCategories[] = [
  {
    id: 'cat1',
    name: 'Pets',
    subCategory: [
      { id: 'sub1', name: 'Cats' },
      { id: 'sub2', name: 'Dogs' },
    ],
  },
  {
    id: 'cat2',
    name: 'Birds',
    subCategory: [
      { id: 'sub3', name: 'Parrots' },
      { id: 'sub4', name: 'Canaries' },
    ],
  },
];

const category = 'sub1';

const expectedResult = [
  { title: 'pets', path: 'cat1' },
  { title: 'cats', path: 'sub1' },
];

test('test getBreadcrumbPaths', () => {
  const result = getBreadcrumbPaths(categories, category);
  expect(result).toEqual(expectedResult);
});
