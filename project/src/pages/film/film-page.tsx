import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { Film } from '../../types/film';
import { FC } from 'react';
import FilmList from '../../components/filmList/filmList';
import { ROUTES } from '../../routes';

type Props = {
  film: Film;
  similarFilms: Film[];
}
const FilmPage: FC<Props> = (props) => {
  const { film, similarFilms } = props;
  return (
    <>
      <section className='film-card film-card--full'>
        <div className='film-card__hero'>
          <div className='film-card__bg'>
            <img src={`img/${film?.posterImage}`} alt={film?.name}/>
          </div>

          <h1 className='visually-hidden'>WTW</h1>

          <Header />

          <div className='film-card__wrap'>
            <div className='film-card__desc'>
              <h2 className='film-card__title'>{film.name}</h2>
              <p className='film-card__meta'>
                <span className='film-card__genre'>{film.genre}</span>
                <span className='film-card__year'>{film.released}</span>
              </p>

              <div className='film-card__buttons'>
                <button className='btn btn--play film-card__button' type='button'>
                  <svg viewBox='0 0 19 19' width='19' height='19'>
                    <use xlinkHref='#play-s'>
                    </use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className='btn btn--list film-card__button' type='button'>
                  <svg viewBox='0 0 19 20' width='19' height='20'>
                    <use xlinkHref='#add'>
                    </use>
                  </svg>
                  <span>My list</span>
                  <span className='film-card__count'>9</span>
                </button>
                <a href={ROUTES.ADDREVIEW} className='btn film-card__button'>Add review</a>
              </div>
            </div>
          </div>
        </div>

        <div className='film-card__wrap film-card__translate-top'>
          <div className='film-card__info'>
            <div className='film-card__poster film-card__poster--big'>
              <img src={'img/the-grand-budapest-hotel-poster.jpg'} alt='The Grand Budapest Hotel poster' width='218' height='327'/>
            </div>

            <div className='film-card__desc'>
              <nav className='film-nav film-card__nav'>
                <ul className='film-nav__list'>
                  <li className='film-nav__item film-nav__item--active'>
                    <a href='#' className='film-nav__link'>Overview</a>
                  </li>
                  <li className='film-nav__item'>
                    <a href='#' className='film-nav__link'>Details</a>
                  </li>
                  <li className='film-nav__item'>
                    <a href='#' className='film-nav__link'>Reviews</a>
                  </li>
                </ul>
              </nav>

              <div className='film-rating'>
                <div className='film-rating__score'>8,9</div>
                <p className='film-rating__meta'>
                  <span className='film-rating__level'>Very good</span>
                  <span className='film-rating__count'>240 ratings</span>
                </p>
              </div>

              <div className='film-card__text'>
                <p>In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge
                  Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave`&apos;`s friend and protege.
                </p>

                <p>{film.description}</p>

                <p className='film-card__director'>
                  <strong>Director: {film.director}
                  </strong>
                </p>

                <p className='film-card__starring'>
                  <strong>Starring: Bill Murray, Edward Norton, Jude Law, Willem Dafoe and other
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className='page-content'>
        <section className='catalog catalog--like-this'>
          <h2 className='catalog__title'>More like this</h2>
          <FilmList films={similarFilms}/>

        </section>

        <Footer />
      </div>
    </>
  );
};

export default FilmPage;
