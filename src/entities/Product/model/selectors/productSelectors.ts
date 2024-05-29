import { RootState } from 'app/providers/storeProvider';
import { Product } from 'shared/types';
import { FormattedCategories } from '../types/productTypes';

const getProducts = (state: RootState): Product[] => {
  return state.product.products;
};

const getProductIsLoading = (state: RootState): boolean => {
  return state.product.isLoading;
};

const getAllCategories = (state: RootState): FormattedCategories[] => {
  return state.product.categories;
};

const getPriceRange = (state: RootState) => {
  return state.product.priceRange;
};

const getAttributes = (state: RootState) => {
  return state.product.attributes;
};

export { getProducts, getProductIsLoading, getAllCategories, getPriceRange, getAttributes };
