import { RootState } from 'app/providers/storeProvider';

export const takePromoCodes = (state: RootState) => {
  return state.promoCode.promoCodes;
};
