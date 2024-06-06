import { RootState } from 'app/providers/storeProvider';
import { Address, ProfileData } from '../types/profileTypes';
import { getProfileData, getProfileDataIsLoading, getProfileError, getUpdatedStatus } from './profileSelectors';

const addressData: Address = {
  id: '1',
  streetName: 'Main St',
  postalCode: '12345',
  city: 'Anytown',
  country: 'USA',
};

const user: ProfileData = {
  id: 'user123',
  version: 1,
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  dateOfBirth: '1990-01-01',
  addresses: [addressData],
  billingAddressIds: ['1'],
  shippingAddressIds: ['1'],
  defaultShippingAddressId: '1',
  defaultBillingAddressId: '1',
};

const testError = 'test';

const initialState: DeepPartial<RootState> = {
  profile: {
    user,
    isLoading: true,
    error: testError,
    updated: true,
  },
};

const state = initialState as RootState;

describe('testing product selectors', () => {
  it('test getProfileError', () => {
    expect(getProfileError(state)).toBe(testError);
  });
  it('test getProfileData', () => {
    expect(getProfileData(state)).toEqual(user);
  });
  it('test getProfileDataIsLoading', () => {
    expect(getProfileDataIsLoading(state)).toBeTruthy();
  });
  it('test getUpdatedStatus', () => {
    expect(getUpdatedStatus(state)).toBeTruthy();
  });
});
