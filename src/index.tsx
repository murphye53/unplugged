import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from "react-router-dom";
import {Auth0Provider} from '@auth0/auth0-react'
import "./web.config";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <Auth0Provider
          domain='dev-wid52y6zrjs8ifcn.us.auth0.com'
          clientId='uwKCdl4q4OwIVSYQreQZMoQf9eca6gdI'
          redirectUri={window.location.origin + "/feed"}          
          cacheLocation={'localstorage'}>
          <Router>
              <App/>
          </Router>
      </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
