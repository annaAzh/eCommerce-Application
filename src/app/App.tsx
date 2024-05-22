import { FC, useEffect } from 'react';
import { RouteProvider } from './providers/routerProvider';
import './styles/variables/global.css';
import './styles/style.css';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getLocalStoreState } from 'shared/lib/storeState/storeState';
import { getAccessToken, requestAccessToken, setUserIsLoginedStatus } from 'entities/User';
import { useAppSelector } from 'shared/lib/hooks/useAppSelect/useAppSelect';
import { getAllProducts } from 'entities/Product';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(getAccessToken);

  useEffect(() => {
    const isLogined: boolean = getLocalStoreState() ? true : false;
    if (isLogined) {
      dispatch(setUserIsLoginedStatus(isLogined));
    }

    dispatch(requestAccessToken());
  }, [dispatch]);

  useEffect(() => {
    if (!token) return;
    dispatch(getAllProducts(token));
  }, [token]);

  return <RouteProvider />;
};

export { App };
