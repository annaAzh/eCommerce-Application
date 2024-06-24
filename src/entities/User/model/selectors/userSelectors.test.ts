import { getAccessToken, getUserError, getUserIsLoginedStatus } from './userSelectors';
import { RootState } from 'app/providers/storeProvider';

const errorMsg = 'test error';
const state: DeepPartial<RootState> = {
  user: {
    user: {
      isLogined: false,
      accessToken: undefined,
    },
    isLoading: false,
    error: errorMsg,
  },
};

const rootState = state as RootState;

describe('testing user selectors', () => {
  it('test getAccessToken', () => {
    expect(getAccessToken(rootState)).toBeUndefined();
  });
  it('test getUserIsLoginedStatus', () => {
    expect(getUserIsLoginedStatus(rootState)).toBeFalsy();
  });
  it('test getUserError', () => {
    expect(getUserError(rootState)).toEqual(errorMsg);
  });
});
