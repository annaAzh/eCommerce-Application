import { initialUserState } from '../../../../app/__mocks__/user/userMock';
import { mockStore } from '../../../../app/__mocks__/store/storeMock';
import { getAccessToken, getUserError, getUserIsLoginedStatus } from './userSelectors';

describe('testing user selectors', () => {
  it('test getAccessToken', () => {
    expect(getAccessToken(mockStore)).toBeUndefined();
    expect(getAccessToken(mockStore)).toEqual(initialUserState.user.accessToken);
  });
  it('test getUserIsLoginedStatus', () => {
    expect(getUserIsLoginedStatus(mockStore)).toBeFalsy();
  });
  it('test getUserError', () => {
    expect(getUserError(mockStore)).toBeUndefined();
    expect(getUserError(mockStore)).toEqual(initialUserState.error);
  });
});
