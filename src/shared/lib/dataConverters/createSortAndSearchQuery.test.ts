import { SearchQueryProps } from 'shared/types';
import { createSortAndSearchQuery } from './createSortAndSearchQuery';

const token = 'test';
const searchQuery: SearchQueryProps = {
  sortBy: 'asc',
  sortField: 'price',
  optionalFilters: ['inStock', 'freeShipping'],
  priceRange: '500-1000',
  categoriesId: 'electronics',
  search: 'smartphone',
  fuzzy: true,
};

const expectedResult = {
  token: 'test',
  sort: 'price asc',
  filter: ['inStock', 'freeShipping', '500-1000', 'categories.id:"electronics"'],
  search: 'smartphone',
  fuzzy: true,
};

describe('test createSortAndSearchQuery', () => {
  const result = createSortAndSearchQuery(token, searchQuery);
  it('token must be the same', () => {
    expect(result.token).toBe(expectedResult.token);
  });
  it('test sort', () => {
    expect(result.sort).toBe(expectedResult.sort);
  });
  it('test filter', () => {
    expect(result.filter).toEqual(expectedResult.filter);
  });
  it('test search', () => {
    expect(result.search).toBe(expectedResult.search);
  });
  it('test fuzzy', () => {
    expect(result.fuzzy).toBeTruthy();
  });
});
