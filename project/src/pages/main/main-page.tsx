import {FC, useState} from 'react';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { Film } from '../../types/film';
import FilmList from '../../components/filmList/filmList';
import GenresList from '../../components/genre-list/genre-list';
import {Genre} from '../../types/genres';
import ShowMore from '../../components/show-more/show-more';
import {useAppSelector} from '../../components/app/hooks';

type Props = {
  film: Film;
}

const SHOWED_FILMS_STEP = 8;

const MainPage: FC<Props> = (props) => {
  const { film } = props;
  const [showedFilmsCount, setShowedFilmsCount] = useState(SHOWED_FILMS_STEP);
  const {films, genre} = useAppSelector((selector) => selector);

  const filteredFilms = films
    .filter((curFilm) => curFilm.genre === genre || genre === Genre.ALL_GENRES)
    .slice(0, showedFilmsCount);

  const handleMoreBtnClick = () => {
    setShowedFilmsCount(showedFilmsCount + SHOWED_FILMS_STEP);
  };

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={film.posterImage} alt={film.name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header />

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img
                src={film.posterImage}
                alt={film.name}
                width="218"
                height="327"
              />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film.genre}</span>
                <span className="film-card__year">{film.released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"/>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"/>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenresList genres={Object.values(Genre)} currentGenre={genre}/>

          <div className="catalog__films-list">
            <FilmList films={filteredFilms}/>
          </div>

          {filteredFilms.length % SHOWED_FILMS_STEP === 0 && <ShowMore onClick={handleMoreBtnClick}/>}
        </section>

        <Footer />
      </div>
    </>
  );
};
export default MainPage;
