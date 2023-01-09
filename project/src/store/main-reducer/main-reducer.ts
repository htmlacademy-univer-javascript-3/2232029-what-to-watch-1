import {createSlice} from '@reduxjs/toolkit';
import {fetchFilmsAction, fetchPromoFilm} from '../api-actions';
import {changeGenre} from '../action';
import {NameSpace} from '../const';
import {Genre} from '../../types/genres';
import {MainState} from '../../types/state';

const initialState: MainState = {
  films: [],
  currentGenre: Genre.ALL_GENRES,
  promoFilm: null,
  error: null,
  isDataLoaded: false
};

export const mainReducer = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFilmsAction.pending, (state) => {
        state.isDataLoaded = false;
      })
      .addCase(fetchPromoFilm.fulfilled, (state, action) => {
        state.promoFilm = action.payload;
      })
      .addCase(changeGenre, (state, action) => {
        state.currentGenre = action.payload;
      })
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.films = action.payload;
        state.isDataLoaded = true;
      });
  }
});
