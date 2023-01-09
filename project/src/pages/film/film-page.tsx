import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { Film } from '../../types/film';
import {FC, useEffect, useState} from 'react';
import FilmList from '../../components/filmList/filmList';
import { ROUTES } from '../../routes';
import Tabs from '../../components/tabs/tabs';
import {Review} from '../../types/review';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useParams} from 'react-router-dom';
import {AxiosError} from 'axios';
import Loader from '../../components/loader/loader';
import { AuthorizationStatus } from '../../const';
import { StatusCodes } from 'http-status-codes';
import {redirectToRoute} from '../../store/action';
import {api} from '../../services/api';

const FilmPage: FC = () => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [film, setFilm] = useState<null | Film>(null);
  const [similarFilms, setSimilarFilms] = useState<null | Film[]>(null);
  const [reviews, setReviews] = useState<null | Review[]>(null);
  const { authorizationStatus } = useAppSelector((state) => state);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scroll({top: 0, behavior: 'smooth'});

    const fetchFilm = async () => {
      const { data: filmInfo } = await api.get<Film>(`/films/${id || -1}`);
      setFilm(filmInfo);
    };
    const fetchSimilarFilms = async () => {
      const { data: films } = await api.get<Film[]>(`/films/${id || -1}/similar`);
      setSimilarFilms(films);
    };
    const fetchFilmReviews = async () => {
      const { data: filmReviews } = await api.get<Review[]>(`/comments/${id || -1}`);
      setReviews(filmReviews);
    };

    setDataLoaded(false);
    fetchFilm()
      .then(() => fetchSimilarFilms())
      .then(() => fetchFilmReviews())
      .then(() => setDataLoaded(true))
      .catch((err: AxiosError) => {
        if (err.response && err.response.status === StatusCodes.NOT_FOUND) {
          dispatch(redirectToRoute(ROUTES.NOTFOUND));
        }
      });
  }, [id]);


  if (!dataLoaded) {
    return <Loader />;
  }

  return (
    <>
      <section className='film-card film-card--full'>
        <div className='film-card__hero'>
          <div className='film-card__bg'>
            <img src={`img/${film?.posterImage ?? ''}`} alt={film?.name}/>
          </div>

          <h1 className='visually-hidden'>WTW</h1>

          <Header />

          <div className='film-card__wrap'>
            <div className='film-card__desc'>
              <h2 className='film-card__title'>{film?.name}</h2>
              <p className='film-card__meta'>
                <span className='film-card__genre'>{film?.genre}</span>
                <span className='film-card__year'>{film?.released}</span>
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
                {
                  authorizationStatus === AuthorizationStatus.Auth &&
                  <a href={id ? `/films/${id}/review` : '#'} className="btn film-card__button">Add review</a>
                }
              </div>
            </div>
          </div>
        </div>

        <div className='film-card__wrap film-card__translate-top'>
          <div className='film-card__info'>
            <div className='film-card__poster film-card__poster--big'>
              <img src={film?.posterImage} alt={film?.name} width='218' height='327'/>
            </div>
            {film && reviews && <Tabs film={film} reviews={reviews} />}
          </div>
        </div>
      </section>

      <div className='page-content'>
        <section className='catalog catalog--like-this'>
          <h2 className='catalog__title'>More like this</h2>
          {similarFilms && <FilmList films={similarFilms} />}

        </section>

        <Footer />
      </div>
    </>
  );
};

export default FilmPage;
