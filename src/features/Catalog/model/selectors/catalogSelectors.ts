import { RootState } from 'app/providers/storeProvider';
import { Product } from 'shared/types';

const getProducts = (state: RootState): Product[] => {
  return state.catalog.products;
};

const getProductIsLoading = (state: RootState): boolean => {
  return state.catalog.isLoading;
};

export { getProducts, getProductIsLoading };
