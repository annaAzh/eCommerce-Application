import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Router, rootRouter } from '../config/rootRouter';
import { Header } from 'widgets/Header';
import { NotificationTool } from 'entities/NotificationTool';

export const RouteProvider = () => {
  return (
    <BrowserRouter>
      <NotificationTool />
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
