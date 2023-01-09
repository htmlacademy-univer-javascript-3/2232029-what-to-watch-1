import {useAppDispatch, useAppSelector} from '../../hooks';
import React from 'react';
import {Film} from '../../types/film';
import {getPromoFilm} from '../../store/main-reducer/main-selector';
import {getFavoriteFilmsAction, fetchPromoFilm, setFavoriteFilmAction} from '../../store/api-actions';

type MyListButtonProps = {
  film: Film|null;
}

function MyListButton(props: MyListButtonProps) {
  const {film} = props;
  const dispatch = useAppDispatch();
  const favoriteFilms = useAppSelector(getFavoriteFilmsAction);
  const promoFilm = useAppSelector(getPromoFilm);

  const favoriteAddHandler = () => {
    const status = Number(!film?.isFavorite);
    const filmId = Number(film?.id);
    dispatch(setFavoriteFilmAction({ id: filmId, status: status }));
    dispatch(getFavoriteFilmsAction());
    if (film?.id === promoFilm?.id) {
      dispatch(fetchPromoFilm());
    }
  };

  return (
    <button className="btn btn--list film-card__button" onClick={favoriteAddHandler}>
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use xlinkHref={film?.isFavorite ? '#in-list' : '#add'}/>
      </svg>
      <span>My list</span>
      <span className="film-card__count">{favoriteFilms.length}</span>
    </button>
  );
}

export default MyListButton;
