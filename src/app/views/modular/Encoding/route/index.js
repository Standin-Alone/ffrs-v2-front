import { authRoles } from 'app/auth/authRoles';
import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const Encoding = Loadable(lazy(() => import('../view/Encoding')));

const route = 
  [{
    path: '/encoding',
    element: <Encoding />    
  }]
;

export default route;
