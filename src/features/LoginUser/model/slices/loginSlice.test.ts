import { requestLogin } from '../services/requestLogin';
import { LoginData, LoginSchema, RefreshTokenSucces } from '../types/loginTypes';
import { clearCustomerId, clearLoginError, loginReducer } from './loginSlice';

const loginData: LoginData = { username: 'test', password: 'test', token: 'test' };
const initialState: LoginSchema = {
  customerId: 'test',
  isLoading: false,
  error: { header: 'test', message: 'another test' },
  responseId: Math.random(),
};

describe('Testing login slice', () => {
  it('should return default state', () => {
    const state = loginReducer(initialState, { type: '' });
    expect(state).toEqual(initialState);
  });
  it('should return error equal undefined', () => {
    const state = loginReducer(initialState, { type: clearLoginError.type });
    expect(state.error).toBeUndefined();
  });
  it('should return customerId equal undefined', () => {
    const state = loginReducer(initialState, { type: clearCustomerId.type });
    expect(state.customerId).toBeUndefined();
  });
  it('should return new customer id', () => {
    const mockData: RefreshTokenSucces = {
      customer: {
        addresses: ['123 Test Street, Test City, Test Country'],
        authenticationMode: 'testMode',
        billingAddressIds: ['billingId1', 'billingId2'],
        createdAt: '2024-05-19T02:30:00Z',
        createdBy: {
          isPlatformClient: true,
          user: {
            id: 'createdByUserId',
            typeId: 'createdByTypeId',
          },
        },
        email: 'test@example.com',
        firstName: 'Test',
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
        lastName: 'User',
        middleName: 'Middle',
        password: 'password',
        salutation: 'Mr.',
        shippingAddressIds: ['shippingId1', 'shippingId2'],
        stores: ['store1', 'store2'],
        title: 'Title',
        version: 1,
        versionModifiedAt: '2024-05-19T02:30:00Z',
      },
    };
    const state = loginReducer(
      initialState,
      requestLogin.fulfilled(mockData, 'requestLoginToken/fulfilled', loginData),
    );
    expect(state.customerId).toEqual(mockData.customer.id);
    expect(state.responseId).not.toEqual(initialState.responseId);
  });
  it('should return pending equal true', () => {
    const state = loginReducer(initialState, requestLogin.pending('requestLoginToken/pending', loginData));
    expect(state.isLoading).toBeTruthy();
    expect(state.responseId).toEqual(initialState.responseId);
  });
});
