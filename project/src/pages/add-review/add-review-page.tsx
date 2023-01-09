import {FC, useEffect, useState} from 'react';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import {useAppDispatch} from '../../hooks';
import {Film} from '../../types/film';
import {useParams} from 'react-router-dom';
import AddReviewForm from '../../components/add-review/add-review-form';
import {redirectToRoute} from '../../store/action';
import {api} from '../../services/api';
import {ROUTES} from '../../routes';

const AddReviewPage: FC = () => {
  const params = useParams();
  const filmId = Number(params.filmId);
  const [film, setFilm] = useState<null | Film>(null);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    api.get<Film>(`/films/${id || -1}`).then(({ data }) => {
      if (data) {
        setFilm(data);
      } else {
        dispatch(redirectToRoute(ROUTES.NOTFOUND));
      }
    });
  }, [filmId]);

  return (
    <section className='film-card film-card--full'>
      <div className='film-card__header'>
        <div className='film-card__bg'>
          <img src={film?.backgroundImage} alt={film?.name}/>
        </div>

        <h1 className='visually-hidden'>WTW</h1>

        <header className='page-header'>
          <Logo/>

          <nav className='breadcrumbs'>
            <ul className='breadcrumbs__list'>
              <li className='breadcrumbs__item'>
                <a href={id ? `/films/${id}` : '#'} className='breadcrumbs__link'>{film?.name}</a>
              </li>
              <li className='breadcrumbs__item'>
                <a className='breadcrumbs__link'>Add review</a>
              </li>
            </ul>
          </nav>

          <UserBlock/>
        </header>

        <div className='film-card__poster film-card__poster--small'>
          <img src={film?.posterImage} alt={film?.name} width='218'
            height='327'
          />
        </div>
      </div>

      <AddReviewForm filmId={filmId} />

    </section>
  );
};
export default AddReviewPage;
