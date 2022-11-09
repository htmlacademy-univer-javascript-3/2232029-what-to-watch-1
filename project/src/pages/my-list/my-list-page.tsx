import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { FC } from 'react';
import FilmList from '../../components/filmList/filmList';
import { Film } from '../../types/film';

type Props = {
  films: Film[];
}
const MyListPage: FC<Props> = (props) => {
  const { films } = props;
  return (
    <div className='user-page'>
      <Header />

      <section className='catalog'>
        <h2 className='catalog__title visually-hidden'>Catalog</h2>
        <FilmList films={films}/>
      </section>
      <Footer />
    </div>
  );
};
export default MyListPage;
