import { RootState } from 'app/providers/storeProvider';

const getAccessToken = (state: RootState): string | undefined => {
  return state.userAccessToken.user.accessToken;
};

const getUserIsLoginedStatus = (state: RootState): boolean => {
  return state.userAccessToken.user.isLogined;
};

const getUserError = (state: RootState): string | undefined => {
  return state.userAccessToken.error;
};

export { getUserIsLoginedStatus, getAccessToken, getUserError };
