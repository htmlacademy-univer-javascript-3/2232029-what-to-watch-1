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
import { Film } from '../../types/film';
import { FC } from 'react';

type Props = {
  film: Film;
  filmList: Film[];
}

const App : FC<Props> = (props) => {
  const { film, filmList } = props;
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.MAIN} element={<MainPage film={film} filmsList={filmList}/>}/>
        <Route path={ROUTES.SIGNIN} element={<SignInPage/>}/>
        <Route
          path={ROUTES.MYLIST}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <MyListPage films={filmList}/>
            </PrivateRoute>
          }
        />
        <Route path={ROUTES.FILM} element={<FilmPage film={film} similarFilms={filmList}/>}/>
        <Route path={ROUTES.ADDREVIEW} element={<AddReviewPage/>}/>
        <Route path={ROUTES.PLAYER} element={<PlayerPage/>}/>
        <Route path={ROUTES.NOTFOUND} element={<NotFoundPage/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
