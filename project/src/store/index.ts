import {configureStore} from '@reduxjs/toolkit';
import {updateStore} from './reducer';
import {api} from '../services/api';
import {redirect} from '../middlewares/redirect';

export const store = configureStore({
  reducer: updateStore,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect)
});

export type AppDispatch = typeof store.dispatch;
