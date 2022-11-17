
import { authRoles } from 'app/auth/authRoles';
import Loadable from 'app/components/Loadable';
import { lazy } from 'react';


const MerchantModule = Loadable(lazy(() => import('../view/MerchantModule')));

const route = [
  {
    path: '/merchant-module',
    element: <MerchantModule/>
            
  }, 
];

export default route;
