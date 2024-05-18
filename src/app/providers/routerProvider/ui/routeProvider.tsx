import { Route, Routes } from 'react-router-dom';
import { Router, rootRouter } from '../config/rootRouter';

export const RouteProvider = () => {
  return (
    <Routes>
      (
      {rootRouter.map((route: Router) => (
        <Route key={route.path} path={route.path} element={route.element}></Route>
      ))}
      )
    </Routes>
  );
};
