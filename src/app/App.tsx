import { FC, useEffect } from 'react';
import { RouteProvider } from './providers/routerProvider';
import './styles/variables/global.css';
import './styles/style.css';
import { requestAccessToken } from 'entities/User/model/services/requestAccessToken';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(requestAccessToken());
  }, [dispatch]);

  return <RouteProvider />;
};

export { App };
