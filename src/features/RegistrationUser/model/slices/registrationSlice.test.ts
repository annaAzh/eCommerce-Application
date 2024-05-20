import { register } from '../services/requestRegistration';
import { RefreshTokenSucces, RegisterSchema, UserCredentials } from '../types/registrationTypes';
import { registerReducer } from './registrationSlice';

const initialState: RegisterSchema = {
  customerId: undefined,
  isLoading: false,
  error: undefined,
};
const registerData: UserCredentials = {
  token: 'test token',
  isSameAddress: false,
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  password: '#0aAasds',
  dateOfBirth: '1990-01-01',
  addresses: [
    {
      id: '0',
      streetName: '123 Main St',
      postalCode: '90001',
      city: 'Los Angeles',
      country: 'USA',
    },
    {
      id: '1',
      streetName: '456 Broadway St',
      postalCode: '10001',
      city: 'New York',
      country: 'USA',
    },
  ],
  defaultBillingAddress: 1,
  defaultShippingAddress: 0,
  shippingAddresses: [0, 1],
  billingAddresses: [0, 1],
};
const registerPayload: RefreshTokenSucces = {
  customer: {
    addresses: [
      {
        id: '0',
        streetName: '123 Main St',
        postalCode: '90001',
        city: 'Los Angeles',
        country: 'USA',
      },
      {
        id: '1',
        streetName: '456 Broadway St',
        postalCode: '10001',
        city: 'New York',
        country: 'USA',
      },
    ],
    authenticationMode: 'testMode',
    billingAddressIds: ['0', '1'],
    createdAt: '2024-05-19T02:30:00Z',
    createdBy: {
      isPlatformClient: true,
      user: {
        id: 'createdByUserId',
        typeId: 'createdByTypeId',
      },
    },
    email: 'john.doe@example.com',
    firstName: 'John',
    id: 'sweetPeach',
    isEmailVerified: true,
    lastMessageSequenceNumber: 1,
    lastModifiedAt: '2024-05-19T02:30:00Z',
    lastModifiedBy: {
      isPlatformClient: true,
    },
    user: {
      id: 'userId',
      typeId: 'typeId',
    },
    lastName: 'Doe',
    middleName: 'Middle',
    password: '#0aAasds',
    salutation: 'Mr.',
    shippingAddressIds: ['0', '1'],
    stores: ['store1', 'store2'],
    title: 'Title',
    version: 1,
    versionModifiedAt: '2024-05-19T02:30:00Z',
  },
};

describe('testing registrationSlice', () => {
  it('should return default state', () => {
    const state = registerReducer(initialState, { type: '' });
    expect(state).toEqual(initialState);
  });
  it('should return customerId equal registerPayload', () => {
    const state = registerReducer(
      initialState,
      register.fulfilled(registerPayload, 'register/fulfilled', registerData),
    );
    expect(state.customerId).toEqual(registerPayload.customer.id);
    expect(state.error).toBeUndefined();
    expect(state.isLoading).toBeFalsy();
  });
  it('should return isLoading equal true', () => {
    const state = registerReducer(initialState, register.pending('register/pending', registerData));
    expect(state.isLoading).toBeTruthy();
  });
});
