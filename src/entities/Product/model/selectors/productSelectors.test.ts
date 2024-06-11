import { RootState } from 'app/providers/storeProvider';
import {
  getAllCategories,
  getAttributes,
  getCurrentPage,
  getPriceRange,
  getProductError,
  getProductIsLoading,
  getProducts,
  getSearchQuery,
  getTotalProducts,
} from './productSelectors';
import { FormattedCategories } from '../types/productTypes';
import { SearchQueryProps } from 'shared/types';

const category: FormattedCategories = {
  id: 'test',
  name: 'test',
  subCategory: [{ id: 'another test', name: 'another test' }],
};

const search: SearchQueryProps = {
  sortField: 'name.en-US',
  sortBy: 'asc',
};
const { sortField, sortBy } = search;

const initialState: DeepPartial<RootState> = {
  product: {
    categories: [category, category],
    priceRange: { min: 0, max: 100 },
    searchQueryProps: { sortBy, sortField },
    isLoading: false,
    error: undefined,
    total: 0,
    currentPage: 1,
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
    expect(getAllCategories(state)).toEqual([category, category]);
  });
  it('test getPriceRange', () => {
    expect(getPriceRange(state)).toEqual(state.product.priceRange);
  });
  it('test getAttributes', () => {
    expect(getAttributes(state)).toBeUndefined();
  });
  it('test getSearchQuery', () => {
    expect(getSearchQuery(state)).toEqual(search);
  });
  it('test getProductError', () => {
    expect(getProductError(state)).toBeUndefined();
  });
  it('test should return 0 on initial state', () => {
    expect(getTotalProducts(state)).toEqual(0);
  });
  it('test should return 10 if total products equal 10', () => {
    const modifiedState = { ...state, product: { ...state.product, total: 10 } };
    expect(getTotalProducts(modifiedState)).toEqual(10);
  });
  it('test should return 1 on initial state', () => {
    expect(getCurrentPage(state)).toEqual(1);
  });
  it('test should return 3 if current page is 3', () => {
    const modifiedState = { ...state, product: { ...state.product, currentPage: 3 } };
    expect(getCurrentPage(modifiedState)).toEqual(3);
  });
});
