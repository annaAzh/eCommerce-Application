import { RootState } from 'app/providers/storeProvider';
import { createSelector } from 'reselect';
import { LineItem } from '../types/cartTypes';

export const getOriginalGoods = createSelector(
  (state: RootState) => state.cart.cart.lineItems,
  (lineItems: LineItem[] | undefined) => {
    const result: Map<string, string> = new Map<string, string>();
    lineItems?.forEach((line) => result.set(line.productId, line.id));
    return result;
  },
);
