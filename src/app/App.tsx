import { FC } from 'react';
import { RouteProvider } from './providers/routerProvider';
import './styles/variables/global.css';
import './styles/style.css';
import { useAuthToken } from './hooks/useAuthToken';

export const App: FC = () => {
  useAuthToken();

  return <RouteProvider />;
};
