
import '../fake-db';
import { Provider } from 'react-redux';
import { useRoutes,Route,Routes} from 'react-router-dom';
import { MatxTheme } from './components';
import { AuthProvider } from './contexts/JWTAuthContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { Store } from './redux/Store';
import routes from './routes';
import { useEffect } from 'react';
import { useState } from 'react';




const App =   () => {


  const [state,setState] = useState([]);

  useEffect(()=>{
    (async ()=>{
      console.warn(`ROUTES`, await routes());
      setState(await routes());
    })()
  },[])




  const content = useRoutes( state);  

  return (
    <Provider store={Store}>
      <SettingsProvider>
        <MatxTheme>
          <AuthProvider>            
              {content}            
          </AuthProvider>
        </MatxTheme>
      </SettingsProvider>
    </Provider>
  );
};

export default App;
