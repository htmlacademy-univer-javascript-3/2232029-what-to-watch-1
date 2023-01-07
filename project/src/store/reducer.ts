import { createReducer } from '@reduxjs/toolkit';
import {mockFilms} from '../mocks/films';
import {changeGenre, fillFilmList} from './action';
import {Genre} from '../types/genres';


const initialState = {
  films: mockFilms,
  genre: Genre.ALL_GENRES,
};

export const updateStore = createReducer(initialState, (builder) => {
  builder
    .addCase(fillFilmList, (state, action) => {
      const { films } = action.payload;
      state.films = films;
    })
    .addCase(changeGenre, (state, action) => {
      const { genre } = action.payload;
      state.genre = genre;
    });
});
