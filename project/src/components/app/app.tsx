import MainPage from '../../pages/main/main-page';

function App(): JSX.Element {
  return (
    <MainPage
      genre={'Drama'}
      img={'img/bg-the-grand-budapest-hotel.jpg'}
      name={'The Grand Budapest Hotel'}
      year={2014}
    />
  );
}

export default App;
