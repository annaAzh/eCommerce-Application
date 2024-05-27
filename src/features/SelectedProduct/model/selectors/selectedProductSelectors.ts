import { RootState } from 'app/providers/storeProvider';

const getSelectedProduct = (state: RootState) => {
  return state.product.product;
};

const getSelectedIsLoading = (state: RootState) => {
  return state.product.isLoading;
};

const getSelectedError = (state: RootState) => {
  return state.product.error;
};

export { getSelectedProduct, getSelectedIsLoading, getSelectedError };
