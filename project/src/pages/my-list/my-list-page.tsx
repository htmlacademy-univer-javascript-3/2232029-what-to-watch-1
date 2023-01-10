import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import {FC, useEffect} from 'react';
import FilmList from '../../components/filmList/filmList';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {AuthorizationStatus} from '../../const';
import {getFavoriteFilmsAction} from '../../store/api-actions';
import {getAuthorizationStatus} from '../../store/user-reducer/user-selector';
import {getFavoriteFilms} from '../../store/main-reducer/main-selector';

const MyListPage: FC = () => {
  const favoriteFilms = useAppSelector(getFavoriteFilms);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(getFavoriteFilmsAction());
    }
  }, [authorizationStatus, dispatch]);
  return (
    <div className='user-page'>
      <Header />

      <section className='catalog'>
        <h2 className='catalog__title visually-hidden'>Catalog</h2>
        <FilmList films={favoriteFilms}/>
      </section>
      <Footer />
    </div>
  );
};
export default MyListPage;
