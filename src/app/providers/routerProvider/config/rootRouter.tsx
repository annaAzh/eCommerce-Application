import { Login } from 'pages/login/Login';
import { Main } from 'pages/main/Main';
import { Registration } from 'pages/registration/Registration';

enum Paths {
  start = '/',
  main = 'main',
  login = 'login',
  registration = 'registration'
}

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
];
