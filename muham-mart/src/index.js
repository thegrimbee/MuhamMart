import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { FirestoreProvider } from './contexts/FirestoreContext';
import { UserProvider } from './contexts/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FirestoreProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </FirestoreProvider>
  </React.StrictMode>
);

reportWebVitals();
