import MainPage from '../../pages/main/main-page';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import NotFoundPage from '../../pages/not-found/not-found-page';
import FilmPage from '../../pages/film/film-page';
import { AuthorizationStatus, ROUTES} from '../../routes';
import PrivateRoute from '../private-route/private-route';
import SignInPage from '../../pages/sign-in/sign-in-page';
import MyListPage from '../../pages/my-list/my-list-page';
import AddReviewPage from '../../pages/add-review/add-review-page';
import PlayerPage from '../../pages/player/player-page';
import { FC } from 'react';
import {useAppSelector} from './hooks';
import {Genre} from '../../types/genres';
import Loader from './loader/loader';

const App : FC = () => {
  const {films, genre, isDataLoaded} = useAppSelector((selector) => selector);

  if (!isDataLoaded){
    return <Loader />;
  }

  const film = films[0];
  const similarFilms = films
    .filter((curFilm) => curFilm.genre === genre || genre === Genre.ALL_GENRES);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.MAIN} element={<MainPage film={film}/>}/>
        <Route path={ROUTES.SIGNIN} element={<SignInPage/>}/>
        <Route
          path={ROUTES.MYLIST}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <MyListPage films={films}/>
            </PrivateRoute>
          }
        />
        <Route path={ROUTES.FILM} element={<FilmPage film={film} similarFilms={similarFilms}/>}/>
        <Route path={ROUTES.ADDREVIEW} element={<AddReviewPage/>}/>
        <Route path={ROUTES.PLAYER} element={<PlayerPage/>}/>
        <Route path={ROUTES.NOTFOUND} element={<NotFoundPage/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
