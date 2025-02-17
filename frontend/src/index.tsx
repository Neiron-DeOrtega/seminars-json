import React from 'react';
import ReactDOM from 'react-dom/client';
import AppContainer from './AppContainer.tsx';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppContainer />
  </React.StrictMode>
);
