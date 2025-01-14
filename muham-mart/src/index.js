import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { FirestoreProvider } from './contexts/FirestoreContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FirestoreProvider>
      <App />
    </FirestoreProvider>
  </React.StrictMode>
);

reportWebVitals();
