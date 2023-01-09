import {createReducer} from '@reduxjs/toolkit';
import {changeAuthorizationStatus, changeGenre, fillFilmList, setFilmsLoadedStatus, setUser} from './action';
import {Genre} from '../types/genres';
import {Film} from '../types/film';
import {AuthorizationStatus} from '../const';
import {User} from '../types/user';

type AppState = {
  films: Film[];
  genre: Genre;
  isDataLoaded: boolean;
  authorizationStatus: AuthorizationStatus;
  user: User | null;
};

const initialState : AppState = {
  isDataLoaded: false,
  films: [],
  genre: Genre.ALL_GENRES,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};

export const updateStore = createReducer(initialState, (builder) => {
  builder
    .addCase(fillFilmList, (state, action) => {
      state.films = action.payload;
    })
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(setFilmsLoadedStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    })
    .addCase(changeAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    });
});
