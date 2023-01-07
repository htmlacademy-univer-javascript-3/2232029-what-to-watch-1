import { createAction } from '@reduxjs/toolkit';
import {Film} from '../types/film';
import {Genre} from '../types/genres';

export const changeGenre = createAction<{genre: Genre}>('changeGenre');
export const fillFilmList = createAction<{films: Film[]}>('fillFilmList');
