import {FC, useState} from 'react';
import FilmCard from '../filmCard/film-card';
import {useAppSelector} from '../../hooks';
import {Film} from '../../types/film';
import {getFilm} from '../../store/film-reducer/film-selector';

type Props = {
  films: Film[];
}

const FilmList: FC<Props> = (props) => {
  const { films } = props;
  const activeFilm = useAppSelector(getFilm);
  const [, setActiveFilmCard] = useState<Film | null>(null);

  const handleMouseEnter = (film: Film) => {
    if (film !== activeFilm) {
      setActiveFilmCard(film);
    }
  };

  return (
    <div className='catalog__films-list'>
      {
        films.map((film) => (
          <FilmCard
            film={film}
            key={film.id}
            onMouseEnter={handleMouseEnter}
          />
        )
        )
      }
    </div>
  );
};

export default FilmList;
