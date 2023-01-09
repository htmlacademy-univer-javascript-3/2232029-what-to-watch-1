import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {Film} from '../types/film';
import {User} from '../types/user';
import {AppDispatch, State} from '../types/state';
import {APIRoute} from '../const';
import { AuthData } from '../types/auth-data';
import {Review} from '../types/review';

export const fetchFilmsAction = createAsyncThunk<Film[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFilms',
  async (_arg, { extra: api}) => {
    const { data } = await api.get<Film[]>(APIRoute.Films);
    return data;
  },
);

export const fetchPromoFilm = createAsyncThunk<Film, undefined, {
  state: State;
  extra: AxiosInstance;
}>(
  'fetchPromoFilm',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Film>(APIRoute.Promo);
    return data;
  }
);

export const checkAuthAction = createAsyncThunk<User, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { extra: api}) => {
    const { data: user } = await api.get<User>(APIRoute.Login);
    return user;
  }
);

export const loginAction = createAsyncThunk<User, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, { extra: api}) => {
    const { data: user } = await api.post<User>(APIRoute.Login, {email, password});
    return user;
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
  }
);

export const fetchFilmById = createAsyncThunk<Film, string, {
  state: State;
  extra: AxiosInstance;
}>(
  'fetchFilmById',
  async (filmId: string, { extra: api }) => {
    const { data } = await api.get<Film>(`${APIRoute.Films}/${filmId}`);
    return data;
  }
);

export const fetchReviewsById = createAsyncThunk<Review[], string, {
  state: State;
  extra: AxiosInstance;
}>(
  'fetchReviewsById',
  async (filmId: string, { extra: api }) => {
    const { data } = await api.get<Review[]>(
      `${APIRoute.Reviews}/${filmId}`
    );
    return data;
  }
);

export const fetchSimilarById = createAsyncThunk<Film[], string, {
  state: State;
  extra: AxiosInstance;
}>(
  'fetchSimilarById',
  async (filmId: string, { extra: api }) => {
    const { data } = await api.get<Film[]>(
      `${APIRoute.Films}/${filmId}${APIRoute.Similar}`
    );
    return data;
  }
);

export const postReview = createAsyncThunk<void, Review, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/postReviewById',
  async ({ comment, rating, filmId }, { extra: api }) => {
    await api.post<Review>(`${APIRoute.Reviews}/${filmId}`, {
      comment,
      rating,
    });
  }
);

export const getFavoriteFilmsAction = createAsyncThunk<Film[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/getFavoriteFilms',
  async (_arg, { extra: api}) => {
    const { data } = await api.get<Film[]>(APIRoute.Favorite);
    return data;
  },
);

export const setFavoriteFilmAction = createAsyncThunk<
  Film,
  { id: number; status: number },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
  >(
    'films/setFavorite',
    async ({ id, status }, { extra: api }) => {
      const { data } = await api.post<Film>(`${APIRoute.Favorite}/${id}/${status}`);
      return data;
    }
  );

export const changeFilmFavoriteStatus = createAsyncThunk<Film, { filmId: number; status: number }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'changeFilmFavoriteStatus',
  async ({ filmId: id, status: isFavorite }, { dispatch, extra: api }) => {
    const { data } = await api.post<Film>(
      `${APIRoute.Favorite}/${id}/${isFavorite}`
    );

    return data;
  }
);

export const changePromoFavoriteStatus = createAsyncThunk<Film, { filmId: number; status: number }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'changePromoFavoriteStatus',
  async ({ filmId: id, status: isFavorite }, { dispatch, extra: api }) => {
    const { data } = await api.post<Film>(
      `${APIRoute.Favorite}/${id}/${isFavorite}`
    );

    return data;
  }
);
