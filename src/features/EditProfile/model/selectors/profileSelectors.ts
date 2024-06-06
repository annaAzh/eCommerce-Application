import { RootState } from 'app/providers/storeProvider';

const getProfileError = (state: RootState): string | undefined => {
  return state.profile.error;
};

const getProfileData = (state: RootState) => {
  return state.profile.user;
};

const getProfileDataIsLoading = (state: RootState): boolean => {
  return state.profile.isLoading;
};

const getUpdatedStatus = (state: RootState) => {
  return state.profile.updated;
};

export { getProfileData, getProfileDataIsLoading, getProfileError, getUpdatedStatus };
