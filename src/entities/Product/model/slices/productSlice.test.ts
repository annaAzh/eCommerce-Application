import { Product, SearchQueryProps } from 'shared/types';
import {
  CatalogProps,
  FormattedAttributesType,
  FormattedCategories,
  ParseResponse,
  ProductSchema,
} from '../types/productTypes';
import {
  addSearchCategory,
  addSearchOptional,
  addSearchPriceRange,
  addSearchSortBy,
  addSearchText,
  clearSearchQuery,
  productReducer,
} from './productSlice';
import { getAllProducts } from '../services/getAllProducts';
import { getAvailableCategories } from '../services/getAvailableCategories';
import { getProductsForParsing } from '../services/getProductsForParsing';

const initialState: ProductSchema = {
  categories: [],
  priceRange: { min: 0, max: 100 },
  isLoading: false,
  error: undefined,
};

describe('testing product slice', () => {
  it('should return default state', () => {
    const state = productReducer(initialState, { type: '' });
    expect(state).toEqual(initialState);
  });
  it('test addSearchSortBy reducer', () => {
    const payload = undefined;
    const state = productReducer(initialState, { type: addSearchSortBy.type, payload });
    expect(state.searchQueryProps).toBeUndefined();
  });
  it('test addSearchPriceRange reducer', () => {
    const testStr = 'test';
    const payload: Required<Pick<SearchQueryProps, 'priceRange'>> | undefined = {
      priceRange: testStr,
    };
    const state = productReducer(initialState, { type: addSearchPriceRange.type, payload });
    expect(state.searchQueryProps).toBeDefined();
    expect(state.searchQueryProps).toEqual(payload);
  });
  it('test addSearchOptional reducer', () => {
    const test = 'test';
    const payload: Required<Pick<SearchQueryProps, 'optionalFilters'>> = {
      optionalFilters: [test, test],
    };
    const state = productReducer(initialState, { type: addSearchOptional.type, payload });
    expect(state.searchQueryProps).toEqual(payload);
  });
  it('test addSearchCategory reducer', () => {
    const payload: Required<Pick<SearchQueryProps, 'categoriesId'>> | undefined = undefined;
    const state = productReducer(initialState, { type: addSearchCategory.type, payload });
    expect(state.searchQueryProps).toBeUndefined();
  });
  it('test addSearchText reducer', () => {
    const payload: Required<Pick<SearchQueryProps, 'search' | 'fuzzy'>> | undefined = { search: 'test', fuzzy: true };
    const state = productReducer(initialState, { type: addSearchText.type, payload });
    expect(state.searchQueryProps).toEqual(payload);
  });
  it('test clearSearchQuery reducer', () => {
    const searchState: ProductSchema = {
      categories: [],
      priceRange: { min: 0, max: 100 },
      isLoading: false,
      searchQueryProps: {
        sortBy: 'asc',
        sortField: 'price',
      },
    };

    const state = productReducer(searchState, { type: clearSearchQuery.type });
    expect(state.searchQueryProps).toBeUndefined();
  });
  it('test getAllProducts/fulfilled', () => {
    const productMock: Product = {
      id: 'test',
      key: 'ab',
      name: 'anopther test',
      description: 'asd',
      images: ['1', '2'],
      prices: { currentPrice: '123$' },
    };

    const data: CatalogProps = { token: 'test' };
    const payload: Product[] = [productMock];
    const state = productReducer(initialState, getAllProducts.fulfilled(payload, 'getAllProducts/fulfilled', data));
    expect(state.error).toBeUndefined();
    expect(state.isLoading).toBeFalsy();
    expect(state.products).toBeDefined();
    expect(state.products).toEqual([productMock]);
  });
  it('test getAllProducts/pending', () => {
    const data: CatalogProps = { token: 'test' };
    const state = productReducer(initialState, getAllProducts.pending('getAllProducts/pending', data));
    expect(state.isLoading).toBeTruthy();
  });
  it('test getAvailableCategories/fulfilled', () => {
    const categoriesMock: FormattedCategories = {
      id: 'test',
      name: ' another test',
      subCategory: [
        {
          id: '1',
          name: '2',
        },
      ],
    };
    const token = 'test';
    const payload: FormattedCategories[] = [categoriesMock];
    const state = productReducer(
      initialState,
      getAvailableCategories.fulfilled(payload, 'getAvailableCategories/fulfilled', token),
    );
    expect(state.error).toBeUndefined();
    expect(state.isLoading).toBeFalsy();
    expect(state.attributes).toBeUndefined();
    expect(state.categories).toEqual([categoriesMock]);
    expect(state.searchQueryProps).toBeUndefined();
    expect(state.priceRange).toBeDefined();
  });
  it('test getAvailableCategories/pending', () => {
    const token = 'test';
    const state = productReducer(initialState, getAvailableCategories.pending('getAvailableCategories/pending', token));
    expect(state.isLoading).toBeTruthy();
  });
  it('test getProductsForParsing/fulfilled', () => {
    const price = { min: 12, max: 322 };
    const attr: FormattedAttributesType = {
      brand: ['value1', 'value2', 'value3'],
      weight: ['value4', 'value5'],
    };
    const payload: ParseResponse = {
      priceRange: price,
      attributes: attr,
    };
    const data: CatalogProps = {
      token: 'test',
    };
    const state = productReducer(
      initialState,
      getProductsForParsing.fulfilled(payload, 'getProductsForParsing/fulfilled', data),
    );
    expect(state.error).toBeUndefined();
    expect(state.isLoading).toBeFalsy();
    expect(state.attributes).toEqual(attr);
    expect(state.priceRange).toEqual(price);
    expect(state.categories).toBeDefined();
    expect(state.searchQueryProps).toBeUndefined();
    expect(state.priceRange).toBeDefined();
  });
  it('test getProductsForParsing/pending', () => {
    const data: CatalogProps = {
      token: 'test',
    };
    const state = productReducer(initialState, getProductsForParsing.pending('getProductsForParsing/pending', data));
    expect(state.isLoading).toBeTruthy();
  });
});
