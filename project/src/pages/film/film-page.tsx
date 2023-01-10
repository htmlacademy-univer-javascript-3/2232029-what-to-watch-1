import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import {FC, useEffect} from 'react';
import FilmList from '../../components/filmList/filmList';
import Tabs from '../../components/tabs/tabs';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {Link, useParams} from 'react-router-dom';
import Loader from '../../components/loader/loader';
import { AuthorizationStatus } from '../../const';
import {getAuthorizationStatus} from '../../store/user-reducer/user-selector';
import MyListButton from '../../components/my-list-button/my-list';
import {getIsDataLoaded} from '../../store/main-reducer/main-selector';
import {getFilm, getReviews, getSimilarFilm} from '../../store/film-reducer/film-selector';
import {fetchFilmById, fetchReviewsById, fetchSimilarById} from '../../store/api-actions';

const FilmPage: FC = () => {
  const id = Number(useParams().id);
  const reviews = useAppSelector(getReviews);
  const film = useAppSelector(getFilm);
  const similarFilms = useAppSelector(getSimilarFilm);
  const isDataLoaded = useAppSelector(getIsDataLoaded);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!film || film.id !== id) {
      dispatch(fetchFilmById(id));
      dispatch(fetchSimilarById(id));
      dispatch(fetchReviewsById(id));
    }
  }, [film, dispatch, id]);


  if (!isDataLoaded) {
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

          <Header/>

          <div className='film-card__wrap'>
            <div className='film-card__desc'>
              <h2 className='film-card__title'>{film?.name}</h2>
              <p className='film-card__meta'>
                <span className='film-card__genre'>{film?.genre}</span>
                <span className='film-card__year'>{film?.released}</span>
              </p>

              <div className='film-card__buttons'>
                <Link to={`/player/${film?.id ?? 0}`} className="btn btn--play film-card__button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"/>
                  </svg>
                  <span>Play</span>
                </Link>
                {authorizationStatus === AuthorizationStatus.Auth ? <MyListButton film={film}/> : null}
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
            {film && reviews && <Tabs film={film} reviews={reviews}/>}
          </div>
        </div>
      </section>

      <div className='page-content'>
        <section className='catalog catalog--like-this'>
          <h2 className='catalog__title'>More like this</h2>
          {similarFilms && <FilmList films={similarFilms}/>}

        </section>

        <Footer/>
      </div>
    </>
  );
};

export default FilmPage;
