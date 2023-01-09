import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {Film} from '../types/film';
import {fillFilmList, setFilmsLoadedStatus} from './action';
import {AppDispatch, State} from '../types/state';

export const fetchFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFilms',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setFilmsLoadedStatus(false));
    const {data} = await api.get<Film[]>('films');
    dispatch(fillFilmList({films: data}));
    dispatch(setFilmsLoadedStatus(true));
  },
);
