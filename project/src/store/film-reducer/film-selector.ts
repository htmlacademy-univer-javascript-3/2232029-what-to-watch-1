import {Film} from '../../types/film';
import {State} from '../../types/state';
import {NameSpace} from '../const';
import {Review} from '../../types/review';

export const getFilm = (state: State): Film | null => state[NameSpace.Film].film;
export const getSimilarFilm = (state: State): Film[] => state[NameSpace.Film].similarFilms;
export const getReviews = (state: State): Review[] => state[NameSpace.Film].reviews;
