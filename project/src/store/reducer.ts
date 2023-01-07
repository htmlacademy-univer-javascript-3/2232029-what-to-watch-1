import { createReducer } from '@reduxjs/toolkit';
import {mockFilms} from "../mocks/films";
import {changeGenre, fillFilmList} from "./action";


const initialState = {
  films: mockFilms,
  genre: 'All genres',
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
