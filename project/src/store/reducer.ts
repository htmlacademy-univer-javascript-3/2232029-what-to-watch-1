import { createReducer } from '@reduxjs/toolkit';
import {changeGenre, fillFilmList, setFilmsLoadedStatus} from './action';
import {Genre} from '../types/genres';
import {Film} from '../types/film';

type AppState = {
  films: Film[];
  genre: Genre;
  isDataLoaded: boolean;
};

const initialState : AppState = {
  isDataLoaded: false,
  films: [],
  genre: Genre.ALL_GENRES,
};

export const updateStore = createReducer(initialState, (builder) => {
  builder
    .addCase(fillFilmList, (state, action) => {
      state.films = action.payload.films;
    })
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload.genre;
    })
    .addCase(setFilmsLoadedStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    });
});
