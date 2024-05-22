import { UserSchema } from 'entities/User';
import { passwordFlow } from '../services/passwordFlow';
import { requestAccessToken } from '../services/requestAccessToken';
import { AccessTokenSuccess, LoginData, PasswordFlowSuccess } from '../types/tokenTypes';
import { clearUserError, setUserId, setUserIsLoginedStatus, userReducer } from './userSlice';

const loginData: LoginData = { username: 'test', password: 'test' };
const initialState: UserSchema = {
  user: {
    isLogined: false,
    accessToken: undefined,
  },
  isLoading: false,
  error: undefined,
};

describe('Testing login slice', () => {
  it('should return default state', () => {
    const state = userReducer(initialState, { type: '' });
    expect(state).toEqual(initialState);
  });
  it('should return userId equal payload', () => {
    const payload = 'ddaSDASs';
    const state = userReducer(initialState, { type: setUserId.type, payload });
    expect(state.user.userId).toBeDefined();
    expect(state.user.userId).toEqual(payload);
  });
  it('should return isLogined status equal payload', () => {
    const payload = true;
    expect(initialState.isLoading).toBeFalsy();
    const state = userReducer(initialState, { type: setUserIsLoginedStatus.type, payload });
    expect(state.user.isLogined).toEqual(payload);
    expect(state.user.isLogined).toBeTruthy();
  });
  it('default error should be undefined', () => {
    const state = userReducer(initialState, { type: clearUserError.type });
    expect(state.error).toBeUndefined();
  });
  it('should return new acces token', () => {
    const payload: AccessTokenSuccess = {
      access_token: Math.random().toString(),
      expires_in: 123,
      scope: 'test',
      token_type: 'another test',
    };
    const state = userReducer(initialState, requestAccessToken.fulfilled(payload, 'requestAccessToken/fulfilled'));
    expect(state.error).toBeUndefined();
    expect(state.isLoading).toBeFalsy();
    expect(state.user.accessToken).toEqual(payload.access_token);
  });
  it('isLoading should be true', () => {
    const state = userReducer(initialState, requestAccessToken.pending('requestAccessToken/pending'));
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
    const state = userReducer(initialState, passwordFlow.fulfilled(payload, 'passwordFlow/fulfilled', loginData));
    expect(state.isLoading).toBeFalsy();
    expect(state.error).toBeUndefined();
    expect(state.user.accessToken).toEqual(payload.access_token);
    expect(state.user.isLogined).toBeTruthy();
  });
  it('test passwordFlow pending', () => {
    const state = userReducer(initialState, passwordFlow.pending('passwordFlow/pending', loginData));
    expect(state.isLoading).toBeTruthy();
  });
});
