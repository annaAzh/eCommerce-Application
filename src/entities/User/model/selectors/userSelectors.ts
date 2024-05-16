import { RootState } from 'app/providers/storeProvider';

export const getAccessToken = (state: RootState): string | undefined => {
  return state.userAccessToken.user.accessToken;
};
