import React, { FC } from 'react';
import GenreItem from './genre-item';
import {Genre} from '../../types/genres';

type Props = {
  currentGenre: string;
  genres: Genre[];
};

const GenresList: FC<Props> = (props) => {
  const {currentGenre, genres} = props;

  return (
    <ul className='catalog__genres-list'>
      {genres.map((genre) =>
        <GenreItem key={genre} isCurrentGenre={currentGenre === genre} genre={genre}/>)}
    </ul>
  );
};

export default GenresList;
