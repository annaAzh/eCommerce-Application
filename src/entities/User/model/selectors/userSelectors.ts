import { RootState } from 'app/providers/storeProvider';

const getAccessToken = (state: RootState): string | undefined => {
  return state.user.user.accessToken;
};

const getUserIsLoginedStatus = (state: RootState): boolean => {
  return state.user.user.isLogined;
};

const getUserError = (state: RootState): string | undefined => {
  return state.user.error;
};

export { getUserIsLoginedStatus, getAccessToken, getUserError };
