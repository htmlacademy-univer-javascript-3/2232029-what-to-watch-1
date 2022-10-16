import MainPage from '../../pages/main/main-page';
import {MainPageProp} from '../../types/main-page-prop';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import NotFoundPage from '../../pages/not-found/not-found-page';
import FilmPage from '../../pages/film/film-page';
import {AuthorizationStatus, ROUTES} from '../../routes';
import PrivateRoute from '../private-route/private-route';
import SignInPage from '../../pages/sign-in/sign-in-page';
import MyListPage from '../../pages/my-list/my-list-page';
import AddReviewPage from '../../pages/add-review/add-review-page';
import PlayerPage from '../../pages/player/player-page';

const mainPageProp: MainPageProp = {
  genre: 'Drama',
  img: 'img/bg-the-grand-budapest-hotel.jpg',
  name: 'The Grand Budapest Hotel',
  year: 2014,
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.MAIN} element={<MainPage {...mainPageProp}/>}/>
        <Route path={ROUTES.SIGNIN} element={<SignInPage/>}/>
        <Route
          path={ROUTES.MYLIST}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <MyListPage/>
            </PrivateRoute>
          }
        />
        <Route path={ROUTES.FILM} element={<FilmPage/>}/>
        <Route path={ROUTES.ADDREVIEW} element={<AddReviewPage/>}/>
        <Route path={ROUTES.PLAYER} element={<PlayerPage/>}/>
        <Route path={ROUTES.NOTFOUND} element={<NotFoundPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
