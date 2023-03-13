import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {CookiesProvider} from "react-cookie";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <CookiesProvider value={['currentDay']}>
          <App />
      </CookiesProvider>
  </React.StrictMode>
);


reportWebVitals();
