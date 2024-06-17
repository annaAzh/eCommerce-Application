import { getPromoCodes } from '../services/getPromoCodes';
import { PromoCode, PromoCodeSchema } from '../types/promoCodesTypes';
import { promoCodeReducer } from './promoCodeSlice';

const code: PromoCode = {
  code: 'abs',
  description: {
    'en-US': 'test',
  },
  isApply: true,
};

const initialState: PromoCodeSchema = {
  promoCodes: [],
  isLoading: true,
};

const payload = [code, code];

const token = 'test token';

describe('testing promoCode slice', () => {
  it('should return default state', () => {
    const state = promoCodeReducer(initialState, { type: '' });
    expect(state).toEqual(initialState);
  });
  it('test getPromoCodes/fulfilled', () => {
    const state = promoCodeReducer(initialState, getPromoCodes.fulfilled(payload, 'getPromoCodes/fulfilled', token));
    expect(state.error).toBeUndefined();
    expect(state.isLoading).toBeFalsy();
    expect(state.promoCodes).toEqual(payload);
  });
  it('test getPromoCodes/pending', () => {
    const state = promoCodeReducer(initialState, getPromoCodes.pending('getPromoCodes/pending', token));
    expect(state.isLoading).toBeTruthy();
  });
});
