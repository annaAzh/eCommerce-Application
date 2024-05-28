import { RootState } from 'app/providers/storeProvider';
import { Product } from 'shared/types';
import { FormattedCategories } from '../types/catalogTypes';

const getProducts = (state: RootState): Product[] => {
  return state.catalog.products;
};

const getProductIsLoading = (state: RootState): boolean => {
  return state.catalog.isLoading;
};

const getAllCategories = (state: RootState): FormattedCategories[] => {
  return state.catalog.categories;
};

const getPriceRange = (state: RootState) => {
  return state.catalog.priceRange;
};

const getAttributes = (state: RootState) => {
  return state.catalog.attributes;
};

export { getProducts, getProductIsLoading, getAllCategories, getPriceRange, getAttributes };
