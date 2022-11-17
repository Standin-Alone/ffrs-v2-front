import useAuth from 'app/hooks/useAuth';
import { flat } from 'app/utils/utils';
import { Navigate, useLocation } from 'react-router-dom';
import AllPages from '../routes';

const userHasPermission =  async (pathname, user, routes) => {
  console.warn('USER PERMISSION',await routes);
  if (!user) {
    return false;
  }
  const asyncRoute  =  await routes;
  
  const matched = asyncRoute.find((r) => r.path === pathname);
  const authenticated =
    matched && matched.auth && matched.auth.length ? matched.auth.includes(user.ROLE) : true;
  return authenticated;
};

const AuthGuard =  ({ children }) => {
  let {
    isAuthenticated,
    user
  } = useAuth();
  const { pathname } = useLocation();
  
    const routes = flat(AllPages);
    
      
    
    const hasPermission = userHasPermission(pathname, user, routes);
    let authenticated = isAuthenticated;
   
  // // IF YOU NEED ROLE BASED AUTHENTICATION,
  // // UNCOMMENT ABOVE LINES
  // // AND COMMENT OUT BELOW authenticated VARIABLE

  // let authenticated = isAuthenticated;

  
  return (
    <>
      {authenticated ? (
        children
      ) : (
        <Navigate replace to="/login" state={{ from: pathname }} />
      )}
    </>
  );
};

export default AuthGuard;
