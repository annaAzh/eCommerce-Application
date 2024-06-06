import { FC, useEffect } from 'react';
import { RouteProvider } from './providers/routerProvider';
import './styles/variables/global.css';
import './styles/style.css';
import { requestAccessToken, setUserIsLoginedStatus } from 'entities/User';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getLocalStoreState } from 'shared/lib/storeState/storeState';
import { refreshFlow } from 'entities/User/model/services/requestRefreshToken';

export const App: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const refreshToken = getLocalStoreState();
    const isLogined: boolean = refreshToken ? true : false;

    if (isLogined) {
      dispatch(refreshFlow(refreshToken));
      dispatch(setUserIsLoginedStatus(isLogined));
    } else {
      dispatch(requestAccessToken());
    }
  }, [dispatch]);

  return <RouteProvider />;
};
