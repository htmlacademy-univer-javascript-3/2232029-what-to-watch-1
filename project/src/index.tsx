import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { mockFilms } from './mocks/films';
import {Provider} from 'react-redux';
import {store} from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
const film = mockFilms[0];
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App film={film} filmList={mockFilms.filter((x) => x.genre === film.genre)}/>
    </Provider>
  </React.StrictMode>,
);
