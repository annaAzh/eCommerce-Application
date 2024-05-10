import { Login } from 'pages/login/Login';
import { Main } from 'pages/main/Main';
import { Registration } from 'pages/registration/Registration';

enum Paths {
  Start = '/',
  Main = 'main',
  Login = 'login',
  Registration = 'registration'
}

export interface Router {
  path: Paths;
  element: JSX.Element;
}

export const rootRouter: Router[] = [
  {
    path: Paths.Start,
    element: <Main />,
  },
  {
    path: Paths.Main,
    element: <Main />,
  },
  {
    path: Paths.Login,
    element: <Login />,
  },
  {
    path: Paths.Registration,
    element: <Registration />,
  },
];
