import { RootState } from 'app/providers/storeProvider';
import {
  getAllCategories,
  getAttributes,
  getPriceRange,
  getProductError,
  getProductIsLoading,
  getProducts,
  getSearchQuery,
} from './productSelectors';
import { FormattedCategories } from '../types/productTypes';
import { SearchQueryProps } from 'shared/types';

const category: FormattedCategories = {
  id: 'test',
  name: 'test',
  subCategory: [{ id: 'another test', name: 'another test' }],
};

const serch: SearchQueryProps = {
  sortField: 'name.en-US',
  sortBy: 'asc',
};
const { sortField, sortBy } = serch;

const initialState: DeepPartial<RootState> = {
  product: {
    categories: [category, category],
    priceRange: { min: 0, max: 100 },
    searchQueryProps: { sortBy, sortField },
    isLoading: false,
    error: undefined,
  },
};

const state = initialState as RootState;

describe('testing product selectors', () => {
  it('test getProducts', () => {
    expect(getProducts(state)).toBeUndefined();
  });
  it('test getProductIsLoading', () => {
    expect(getProductIsLoading(state)).toBeFalsy();
  });
  it('test getAllCategories', () => {
    console.log(getAllCategories(state));
    expect(getAllCategories(state)).toEqual([category, category]);
  });
  it('test getPriceRange', () => {
    expect(getPriceRange(state)).toEqual(state.product.priceRange);
  });
  it('test getAttributes', () => {
    expect(getAttributes(state)).toBeUndefined();
  });
  it('test getSearchQuery', () => {
    expect(getSearchQuery(state)).toEqual(serch);
  });
  it('test getProductError', () => {
    expect(getProductError(state)).toBeUndefined();
  });
});
