import { requestAccessToken, setAccessToken, setUserIsLoginedStatus } from 'entities/User';
import { refreshFlow } from 'entities/User/model/services/requestRefreshToken';
import { PasswordFlowSuccess } from 'entities/User/model/types/tokenTypes';
import { useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { clearLocalStoreState, getLocalStoreState, isAccessTokenExpired } from 'shared/lib/storeState/storeState';

export const useAuthToken = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleToken = async () => {
      const tokenOauth = getLocalStoreState();
      const isLogined: boolean = tokenOauth.access_token ? true : false;

      if (isLogined && !isAccessTokenExpired(tokenOauth.expires_in)) {
        dispatch(setUserIsLoginedStatus(isLogined));
        const token = tokenOauth.access_token;
        dispatch(setAccessToken(token));
      } else if (isLogined && isAccessTokenExpired(tokenOauth.expires_in)) {
        const newToken = (await dispatch(refreshFlow(tokenOauth.refresh_token))) as unknown as PasswordFlowSuccess;

        if (newToken) {
          dispatch(setUserIsLoginedStatus(true));
          dispatch(setAccessToken(newToken.access_token));
        } else {
          dispatch(setUserIsLoginedStatus(false));
          clearLocalStoreState();
        }
      } else {
        dispatch(requestAccessToken());
      }
    };

    handleToken();
  }, [dispatch]);
};
