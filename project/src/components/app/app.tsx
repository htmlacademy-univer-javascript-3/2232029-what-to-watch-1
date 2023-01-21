import MainPage from '../../pages/main/main-page';
import {Route, Routes} from 'react-router-dom';
import NotFoundPage from '../../pages/not-found/not-found-page';
import FilmPage from '../../pages/film/film-page';
import { ROUTES} from '../../routes';
import PrivateRoute from '../private-route/private-route';
import SignInPage from '../../pages/sign-in/sign-in-page';
import MyListPage from '../../pages/my-list/my-list-page';
import AddReviewPage from '../../pages/add-review/add-review-page';
import PlayerPage from '../../pages/player/player-page';
import { FC } from 'react';
import {useAppSelector} from '../../hooks';
import Loader from '../loader/loader';
import {getAuthorizationStatus} from '../../store/user-reducer/user-selector';
import {getIsDataLoaded} from '../../store/main-reducer/main-selector';
import browserHistory from '../browser-history/browser-history';
import HistoryRouter from '../history-router/history-router';

const App : FC = () => {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isDataLoaded = useAppSelector(getIsDataLoaded);

  if (!isDataLoaded){
    return <Loader />;
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={ROUTES.MAIN} element={<MainPage/>}/>
        <Route path={ROUTES.SIGNIN} element={<SignInPage/>}/>
        <Route
          path={ROUTES.MYLIST}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <MyListPage/>
            </PrivateRoute>
          }
        />
        <Route path={ROUTES.FILM} element={<FilmPage/>}/>
        <Route
          path={ROUTES.ADDREVIEW}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <AddReviewPage />
            </PrivateRoute>
          }
        />
        <Route path={ROUTES.PLAYER} element={<PlayerPage/>}/>
        <Route path={ROUTES.NOTFOUND} element={<NotFoundPage/>}/>
        <Route path={ROUTES.DEFAULT} element={<NotFoundPage/>}/>
      </Routes>
    </HistoryRouter>
  );
};

export default App;
