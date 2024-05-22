import { RootState } from 'app/providers/storeProvider';
import { Product } from '../types/productTypes';

const getProducts = (state: RootState): Product[] => {
  return state.product.products;
};

const getProductIsLoading = (state: RootState): boolean => {
  return state.product.isLoading;
};

export { getProducts, getProductIsLoading };
