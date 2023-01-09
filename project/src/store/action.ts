import { createAction } from '@reduxjs/toolkit';
import {Film} from '../types/film';
import {Genre} from '../types/genres';
import {AuthorizationStatus} from '../const';
import {User} from '../types/user';

export const changeGenre = createAction<Genre>('changeGenre');
export const fillFilmList = createAction<Film[]>('fillFilmList');
export const setFilmsLoadedStatus = createAction<boolean>('setFilmsLoadedStatus');
export const changeAuthorizationStatus = createAction<AuthorizationStatus>('changeAuthorizationStatus');
export const setUser = createAction<User>('setUser');
