import { RootState } from 'app/providers/storeProvider';

const getProducts = (state: RootState) => {
  return state.product.products;
};

export { getProducts };
