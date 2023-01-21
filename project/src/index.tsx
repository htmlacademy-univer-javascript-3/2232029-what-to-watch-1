import 'react-toastify/dist/ReactToastify.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {Provider} from 'react-redux';
import {store} from './store';
import {fetchFilmsAction, checkAuthAction, fetchPromoFilm, getFavoriteFilmsAction} from './store/api-actions';
import {ToastContainer} from 'react-toastify';
import browserHistory from './components/browser-history/browser-history';
import HistoryRouter from './components/history-router/history-router';

store.dispatch(checkAuthAction());
store.dispatch(fetchFilmsAction());
store.dispatch(fetchPromoFilm());
store.dispatch(checkAuthAction());
store.dispatch(getFavoriteFilmsAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}/>
      <ToastContainer/>
      <App />
    </Provider>
  </React.StrictMode>,
);
