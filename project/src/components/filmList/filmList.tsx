import {FC, useState} from 'react';
import { Film } from '../../types/film';
import FilmCard from '../filmCard/film-card';

type Props = {
    films: Film[];
}

const FilmList: FC<Props> = (props) => {
  const { films } = props;
  const [, setActiveFilmCard] = useState<number | null>(null);

  return (
    <div className='catalog__films-list'>
      {
        films.map((film) => (
          <FilmCard
            film={{
              id: film.id,
              image: film.posterImage,
              name: film.name,
              previewVideoLink: film.previewVideoLink
            }}
            key={film.id}
            onHover={setActiveFilmCard}
          />
        )
        )
      }
    </div>
  );
};

export default FilmList;
