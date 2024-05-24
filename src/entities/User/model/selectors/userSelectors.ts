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

const getUserProfileData = (state: RootState) => {
  return state.user.user;
};

const getUserDataIsLoading = (state: RootState): boolean => {
  return state.user.isLoading;
};

export { getUserIsLoginedStatus, getAccessToken, getUserError, getUserProfileData, getUserDataIsLoading };
