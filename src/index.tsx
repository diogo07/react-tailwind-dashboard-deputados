import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import HomePage from './pages/HomePage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <HomePage />
  </React.StrictMode>
);
