import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { mockFilms } from './mocks/films';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
const film = mockFilms[0];
root.render(
  <React.StrictMode>
    <App film={film} filmList={mockFilms.filter((x) => x.genre === film.genre)}/>
  </React.StrictMode>,
);
