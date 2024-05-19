import { initialLoginState } from '../../../../app/__mocks__/login/loginMock';
import { requestLogin } from '../services/requestLogin';
import { LoginData, RefreshTokenSucces } from '../types/loginTypes';
import { clearLoginError, loginReducer } from './loginSlice';

const loginData: LoginData = { username: 'test', password: 'test', token: 'test' };

describe('Testing login slice', () => {
  it('should return default state', () => {
    const state = loginReducer(initialLoginState, { type: '' });
    expect(state).toEqual(initialLoginState);
  });
  it('should return error equal undefined', () => {
    const state = loginReducer(initialLoginState, { type: clearLoginError.type });
    expect(state.error).toBeUndefined();
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
      initialLoginState,
      requestLogin.fulfilled(mockData, 'login/requestLoginToken', loginData),
    );
    expect(state.customerId).toEqual(mockData.customer.id);
    expect(state.responeId).not.toEqual(initialLoginState.responeId);
  });
  it('should return pending equal true', () => {
    const state = loginReducer(initialLoginState, requestLogin.pending('login/requestLoginToken', loginData));
    expect(state.isLoading).toBeTruthy();
    expect(state.responeId).toEqual(initialLoginState.responeId);
  });
});
