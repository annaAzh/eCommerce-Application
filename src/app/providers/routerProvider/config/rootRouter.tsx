import { Card } from 'pages/card/Card';
import { Catalog } from 'pages/catalog/Catalog';
import { Login } from 'pages/login/Login';
import { Main } from 'pages/main/Main';
import { NotFound } from 'pages/notFound/NotFound';
import { Profile } from 'pages/profile/Profile';
import { Registration } from 'pages/registration/Registration';
import { Paths } from 'shared/types';

export interface Router {
  path: Paths;
  element: JSX.Element;
}

export const rootRouter: Router[] = [
  {
    path: Paths.start,
    element: <Main />,
  },
  {
    path: Paths.main,
    element: <Main />,
  },
  {
    path: Paths.login,
    element: <Login />,
  },
  {
    path: Paths.registration,
    element: <Registration />,
  },
  {
    path: Paths.notFound,
    element: <NotFound />,
  },
  {
    path: Paths.catalog,
    element: <Catalog />,
  },
  {
    path: Paths.card,
    element: <Card />,
  },
  {
    path: Paths.profile,
    element: <Profile />,
  },
];
