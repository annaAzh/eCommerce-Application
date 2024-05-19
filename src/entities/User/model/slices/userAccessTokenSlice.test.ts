import { initialUserState } from '../../../../app/__mocks__/user/userMock';
import { passwordFlow } from '../services/passwordFlow';
import { requestAccessToken } from '../services/requestAccessToken';
import { AccessTokenSuccess, LoginData, PasswordFlowSuccess } from '../types/tokenTypes';
import { clearUserError, setUserId, setUserIsLoginedStatus, userAccessTokenReducer } from './userAccessTokenSlice';

const loginData: LoginData = { username: 'test', password: 'test' };

describe('Testing login slice', () => {
  it('should return default state', () => {
    const state = userAccessTokenReducer(initialUserState, { type: '' });
    expect(state).toEqual(initialUserState);
  });
  it('should return userId equal payload', () => {
    const payload = 'ddaSDASs';
    const state = userAccessTokenReducer(initialUserState, { type: setUserId.type, payload });
    expect(state.user.userId).toBeDefined();
    expect(state.user.userId).toEqual(payload);
  });
  it('should return isLogined status equal payload', () => {
    const payload = true;
    expect(initialUserState.isLoading).toBeFalsy();
    const state = userAccessTokenReducer(initialUserState, { type: setUserIsLoginedStatus.type, payload });
    expect(state.user.isLogined).toEqual(payload);
    expect(state.user.isLogined).toBeTruthy();
  });
  it('default error should be undefined', () => {
    const state = userAccessTokenReducer(initialUserState, { type: clearUserError.type });
    expect(state.error).toBeUndefined();
  });
  it('should return new acces token', () => {
    const payload: AccessTokenSuccess = {
      access_token: Math.random().toString(),
      expires_in: 123,
      scope: 'test',
      token_type: 'another test',
    };
    const state = userAccessTokenReducer(
      initialUserState,
      requestAccessToken.fulfilled(payload, 'user/requestAccessToken'),
    );
    expect(state.error).toBeUndefined();
    expect(state.isLoading).toBeFalsy();
    expect(state.user.accessToken).toEqual(payload.access_token);
  });
  it('isLoading should be true', () => {
    const state = userAccessTokenReducer(initialUserState, requestAccessToken.pending('user/requestAccessToken'));
    expect(state.isLoading).toBeTruthy();
  });
  it('test passwordFlow fulfilled', () => {
    const payload: PasswordFlowSuccess = {
      access_token: 'test',
      expires_in: 12321,
      scope: 'another test',
      token_type: 'refresh token type',
      refresh_token: 'test refresh',
    };
    const state = userAccessTokenReducer(
      initialUserState,
      passwordFlow.fulfilled(payload, 'passwordFlow/fulfilled', loginData),
    );
    expect(state.isLoading).toBeFalsy();
    expect(state.error).toBeUndefined();
    expect(state.user.accessToken).toEqual(payload.access_token);
    expect(state.user.isLogined).toBeTruthy();
  });
  it('test passwordFlow pending', () => {
    const state = userAccessTokenReducer(initialUserState, passwordFlow.pending('passwordFlow/pending', loginData));
    expect(state.isLoading).toBeTruthy();
  });
});
