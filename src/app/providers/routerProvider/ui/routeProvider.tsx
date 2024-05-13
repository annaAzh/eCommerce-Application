import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Router, rootRouter } from '../config/rootRouter';
import { Header } from 'widgets/Header';

export const RouteProvider = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        (
        {rootRouter.map((route: Router) => (
          <Route key={route.path} path={route.path} element={route.element}></Route>
        ))}
        )
      </Routes>
    </BrowserRouter>
  );
};
