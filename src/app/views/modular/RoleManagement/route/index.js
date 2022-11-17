
import { authRoles } from 'app/auth/authRoles';
import Loadable from 'app/components/Loadable';
import { lazy } from 'react';


const RoleManagement = Loadable(lazy(() => import('../view/RoleManagement')));

const route = [
  {
    path: '/roles',
    element: <RoleManagement/>
            
  }, 
];

export default route;
