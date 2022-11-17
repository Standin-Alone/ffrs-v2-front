import AuthGuard from 'app/auth/AuthGuard';
import chartsRoute from 'app/views/charts/ChartsRoute';
import dashboardRoutes from 'app/views/dashboard/DashboardRoutes';
import materialRoutes from 'app/views/material-kit/MaterialRoutes';
import NotFound from 'app/views/sessions/NotFound';
import sessionRoutes from 'app/views/sessions/SessionRoutes';
import { Navigate } from 'react-router-dom';
import MatxLayout from './components/MatxLayout/MatxLayout';
import  loginRoutes from 'app/views/modular/Login/LoginRoutes';
import  usersRoute from 'app/views/modular/UserManagement/route';
import  encodingRoute from 'app/views/modular/Encoding/route';


const data = require.context("app/views/modular", true, /\index.js$/, 'lazy');

const routes = ()=>{

  return new Promise((resolve,reject)=>{
    let arrayModules = [];
    Promise.all(data.keys().map((item)=>{
      const cleanModule = item.substring(item.indexOf('./') + 1);
      return import(`app/views/modular${cleanModule.replace('/index.js','')}`).then(component=>{                        
          arrayModules.push(component.default[0]);
          return component.default[0];
      })  
      
    })).then((response)=>{

        let routes = [  
          {                 
            children: response.flat(),
            element: (
              <AuthGuard>
                <MatxLayout />    
              </AuthGuard>
            )
        },
        ...loginRoutes,
          { path: '/', element:   <AuthGuard><Navigate to="/users" /> </AuthGuard>},
          { path: '*', element:<NotFound /> },    
        ];      
        resolve(routes);
    })
    
  });  
}

export default routes;
