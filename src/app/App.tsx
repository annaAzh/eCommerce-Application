import { FC, useEffect } from 'react';
import { RouteProvider } from './providers/routerProvider';
import './styles/variables/global.css';
import './styles/style.css';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getLocalStoreState } from 'shared/lib/storeState/storeState';
import { requestAccessToken, setAccessToken, setUserIsLoginedStatus } from 'entities/User';

export const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const isLogined: boolean = getLocalStoreState() ? true : false;
    if (isLogined) {
      dispatch(setUserIsLoginedStatus(isLogined));
      const token = getLocalStoreState();
      dispatch(setAccessToken(token));
    } else {
      dispatch(requestAccessToken());
    }
  }, [dispatch]);

  return <RouteProvider />;
};
