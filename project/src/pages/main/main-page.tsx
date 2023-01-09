import {FC, useState} from 'react';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import FilmList from '../../components/filmList/filmList';
import GenresList from '../../components/genre-list/genre-list';
import {Genre} from '../../types/genres';
import ShowMore from '../../components/show-more/show-more';
import {useAppSelector} from '../../hooks';
import {getCurrentGenre, getFilms, getPromoFilm} from '../../store/main-reducer/main-selector';
import {getAuthorizationStatus} from '../../store/user-reducer/user-selector';
import {AuthorizationStatus} from '../../const';
import {Link} from 'react-router-dom';
import PlayerButton from '../../components/player-button/player-button';
import MyListButton from '../../components/my-list-button/my-list';

const SHOWED_FILMS_STEP = 8;

const MainPage: FC = () => {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const films = useAppSelector(getFilms);
  const currentGenre = useAppSelector(getCurrentGenre);
  const promoFilm = useAppSelector(getPromoFilm);
  const [showedFilmsCount, setShowedFilmsCount] = useState(SHOWED_FILMS_STEP);

  const filteredFilms = films
    .filter((curFilm) => curFilm.genre === currentGenre || currentGenre === Genre.ALL_GENRES)
    .slice(0, showedFilmsCount);

  const handleMoreBtnClick = () => {
    setShowedFilmsCount(showedFilmsCount + SHOWED_FILMS_STEP);
  };

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promoFilm?.posterImage} alt={promoFilm?.name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header />

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img
                src={promoFilm?.posterImage}
                alt={promoFilm?.name}
                width="218"
                height="327"
              />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promoFilm?.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoFilm?.genre}</span>
                <span className="film-card__year">{promoFilm?.released}</span>
              </p>

              <div className="film-card__buttons">
                <Link to={`/player/${promoFilm?.id ?? 0}`} className="btn btn--play film-card__button">
                  <PlayerButton isPlay/>
                </Link>
                { authorizationStatus === AuthorizationStatus.Auth ? <MyListButton film={promoFilm}/> : null }
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenresList genres={Object.values(Genre)} currentGenre={currentGenre}/>

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
