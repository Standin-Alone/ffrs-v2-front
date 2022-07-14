
import { authRoles } from 'app/auth/authRoles';
import Loadable from 'app/components/Loadable';
import { lazy } from 'react';


const Users = Loadable(lazy(() => import('../view/Users')));

const route = [
  {
    path: '/users',
    element: <Users/>
            
  }, 
];

export default route;
