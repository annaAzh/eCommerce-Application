import { RootState } from 'app/providers/storeProvider';

const getSelectedProduct = (state: RootState) => {
  return state.card.product;
};

const getSelectedIsLoading = (state: RootState) => {
  return state.card.isLoading;
};

const getSelectedError = (state: RootState) => {
  return state.card.error;
};

export { getSelectedProduct, getSelectedIsLoading, getSelectedError };
