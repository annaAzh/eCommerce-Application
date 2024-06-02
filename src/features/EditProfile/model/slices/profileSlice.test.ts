import { getUserProfile } from '../services/getUserProfile';
import { updateUserDetails } from '../services/updateDetailsProfile';
import { updateUserPassword } from '../services/updatePasswordProfile';
import { Address, ProfileData, ProfileSchema, UpdateDetailsParams, UpdatePasswordParams } from '../types/profileTypes';
import { clearProfileError, clearProfileUpdated, profileReducer } from './profileSlice';

const initialState: ProfileSchema = {
  user: {},
  isLoading: false,
  error: 'test',
  updated: false,
};
const token = 'test';

const addressData: Address = {
  id: '1',
  streetName: 'Main St',
  postalCode: '12345',
  city: 'Anytown',
  country: 'USA',
};

const payload: ProfileData = {
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

const testData: UpdateDetailsParams = {
  firstName: 'Alex',
  lastName: 'Ivanov',
  email: 'alex.ivanov@example.com',
  dateOfBirth: '1984-07-16',
  id: 'user456',
  token: 'abc123token',
  version: 2,
};

const passwordData: UpdatePasswordParams = {
  currentPassword: 'oldPass123!',
  newPassword: 'newPass456!',
  id: 'user789',
  token: 'xyz789token',
  version: 1,
};

describe('testing product slice', () => {
  it('should return default state', () => {
    const state = profileReducer(initialState, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('test clearProfileError reducer', () => {
    const state = profileReducer(initialState, { type: clearProfileError.type, payload });
    expect(state.error).toBeUndefined();
  });
  it('test clearProfileUpdated reducer', () => {
    const state = profileReducer(initialState, { type: clearProfileUpdated.type, payload });
    expect(state.updated).toBeFalsy();
  });
  it('test getUserProfile/fulfilled', () => {
    const state = profileReducer(initialState, getUserProfile.fulfilled(payload, 'getUserProfile/fulfilled', token));
    expect(state.error).toBeUndefined();
    expect(state.isLoading).toBeFalsy();
    expect(state.user.addresses).toEqual(payload.addresses);
    expect(state.user).toEqual(payload);
    expect(state.updated).toBeFalsy();
  });
  it('test getUserProfile/pending', () => {
    const state = profileReducer(initialState, getUserProfile.pending('getUserProfile/pending', token));
    expect(state.isLoading).toBeTruthy();
  });
  it('test updateUserDetails/fulfilled', () => {
    const state = profileReducer(
      initialState,
      updateUserDetails.fulfilled(payload, 'updateUserDetails/fulfilled', testData),
    );
    expect(state.error).toBeUndefined();
    expect(state.isLoading).toBeFalsy();
    expect(state.user.addresses).toEqual(payload.addresses);
    expect(state.user).toEqual(payload);
    expect(state.updated).toBeTruthy();
  });
  it('test updateUserDetails/pending', () => {
    const state = profileReducer(initialState, updateUserDetails.pending('updateUserDetails/pending', testData));
    expect(state.isLoading).toBeTruthy();
  });
  it('test updateUserPassword/fulfilled', () => {
    const state = profileReducer(
      initialState,
      updateUserPassword.fulfilled(payload, 'updateUserPassword/fulfilled', passwordData),
    );
    expect(state.error).toBeUndefined();
    expect(state.isLoading).toBeFalsy();
    expect(state.user.addresses).toEqual(payload.addresses);
    expect(state.user).toEqual(payload);
    expect(state.updated).toBeTruthy();
  });
  it('test updateUserPassword/pending', () => {
    const state = profileReducer(initialState, updateUserPassword.pending('updateUserPassword/pending', passwordData));
    expect(state.isLoading).toBeTruthy();
  });
});
