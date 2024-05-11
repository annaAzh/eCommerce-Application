import { FC } from 'react';
import { RouteProvider } from './providers/routerProvider';
import './styles/variables/global.css';
import './styles/style.css';

const App: FC = () => {
  return <RouteProvider />;
};

export { App };
