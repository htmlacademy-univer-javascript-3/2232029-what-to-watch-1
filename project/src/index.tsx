import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { mockFilms } from './mocks/films';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App film={mockFilms[0]} filmList={mockFilms}/>
  </React.StrictMode>,
);
