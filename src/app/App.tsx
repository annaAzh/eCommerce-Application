import { FC, useEffect } from 'react';
import { RouteProvider } from './providers/routerProvider';
import './styles/variables/global.css';
import './styles/style.css';
import { getAccessToken, getUserIsLoginedStatus, requestAccessToken, setUserIsLoginedStatus } from 'entities/User';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getLocalStoreState } from 'shared/lib/storeState/storeState';
import { refreshFlow } from 'entities/User/model/services/requestRefreshToken';
import { getExistCart } from 'entities/Cart';
import { useAppSelector } from 'shared/lib/hooks';

export const App: FC = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(getAccessToken);
  const isLoginedUser = useAppSelector(getUserIsLoginedStatus);

  useEffect(() => {
    const refreshToken = getLocalStoreState();
    const anonymous = getLocalStoreState('anonymous');
    const isLogined: boolean = refreshToken ? true : false;

    if (isLogined) {
      dispatch(refreshFlow(refreshToken));
      dispatch(setUserIsLoginedStatus(isLogined));
    } else if (anonymous) {
      dispatch(refreshFlow(anonymous));
    } else {
      dispatch(requestAccessToken());
    }
  }, []);

  useEffect(() => {
    if (token && isLoginedUser == false) {
      dispatch(requestAccessToken());
    }
  }, [isLoginedUser]);

  useEffect(() => {
    if (!token) return;
    dispatch(getExistCart(token));
  }, [token]);

  return <RouteProvider />;
};
