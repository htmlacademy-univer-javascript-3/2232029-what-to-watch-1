import React from 'react';
import {changeGenre} from '../../store/action';
import {store} from '../../store';
import {Genre} from '../../types/genres';

type Props = {
  isCurrentGenre: boolean;
  genre: Genre;
};

const GenreItem: React.FC<Props> = (props) => {
  const {genre, isCurrentGenre} = props;
  const clickHandler = () => {
    store.dispatch(changeGenre(genre));
  };

  return (
    <li className={`catalog__genres-item ${isCurrentGenre ? 'catalog__genres-item--active' : ''}`}>
      <a className='catalog__genres-link' onClick={clickHandler}>{genre}</a>
    </li>
  );
};

export default GenreItem;
