import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const Login = Loadable(lazy(() => import('./view/Login')));

const loginRoutes = [
  {
    path: '/login',
    element: <Login />,
  }, 
];

export default loginRoutes;
