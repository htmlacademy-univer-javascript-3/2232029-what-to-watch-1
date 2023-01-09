import {Film} from '../../types/film';
import {State} from '../../types/state';
import {NameSpace} from '../const';

export const getFilms = (state: State): Film[] => state[NameSpace.Data].films;
export const getPromoFilm = (state: State): Film | null => state[NameSpace.Data].promoFilm;
export const getCurrentGenre = (state: State): string => state[NameSpace.Data].currentGenre;
export const getIsDataLoaded = (state: State): boolean => state[NameSpace.Data].isDataLoaded;
export const getError = (state: State): string|null => state[NameSpace.Data].error;
