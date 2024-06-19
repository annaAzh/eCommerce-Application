import { RootState } from 'app/providers/storeProvider';
import { PromoCode, PromoCodeSchema } from '../types/promoCodesTypes';
import { takePromoCodes } from './promoCodeSelectors';

const code: PromoCode = {
  code: 'abs',
  description: {
    'en-US': 'test',
  },
  isApply: true,
};

const promo: Partial<PromoCodeSchema> = { promoCodes: [code, code] };

const initialState: DeepPartial<RootState> = {
  promoCode: promo,
};

const state = initialState as RootState;

test('test takePromoCodes should be equal to test data', () => {
  expect(takePromoCodes(state)).toEqual(promo.promoCodes);
});
