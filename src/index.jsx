import React,{lazy} from 'react';
import { CssBaseline } from '@mui/material';
import { StyledEngineProvider } from '@mui/styled-engine';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './app/App';
import Loadable from 'app/components/Loadable';
import * as serviceWorker from './serviceWorker';
const Apps = Loadable(lazy(() => import('./app/App')));


ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <Router>
      <CssBaseline />      
        <Apps/>      
    </Router>
  </StyledEngineProvider>,
  document.getElementById('root')
);

// for IE-11 support un-comment cssVars() and it's import in this file
// and in MatxTheme file

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
