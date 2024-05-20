import { getAccessToken, getUserError, getUserIsLoginedStatus } from './userSelectors';
import { RootState } from 'app/providers/storeProvider';

const errorMsg = 'test error';
const state: DeepPartial<RootState> = {
  userAccessToken: {
    user: {
      isLogined: false,
      accessToken: undefined,
    },
    isLoading: false,
    error: errorMsg,
  },
};

describe('testing user selectors', () => {
  it('test getAccessToken', () => {
    expect(getAccessToken(state as RootState)).toBeUndefined();
  });
  it('test getUserIsLoginedStatus', () => {
    expect(getUserIsLoginedStatus(state as RootState)).toBeFalsy();
  });
  it('test getUserError', () => {
    expect(getUserError(state as RootState)).toEqual(errorMsg);
  });
});
