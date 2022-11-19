import { FC } from 'react';
import { FilmShort } from '../../types/film-short';

type Props = {
  film: FilmShort;
}

const FilmCard: FC<Props> = (props) => {
  const { film } = props;
  return(
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={film.image} alt={film.name} width="280" height="175"/>
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href={`/films/${film.id}`}>{film.name}</a>
      </h3>
    </article>
  );
};

export default FilmCard;
