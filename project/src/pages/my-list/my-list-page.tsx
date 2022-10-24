import Header from '../../components/header/header';
import FilmCard from '../../components/filmCard/film-card';
import Footer from '../../components/footer/footer';

export default function MyListPage() {
  return (
    <div className='user-page'>
      <Header />

      <section className='catalog'>
        <h2 className='catalog__title visually-hidden'>Catalog</h2>
        <div className='catalog__films-list'>
          <FilmCard
            img={'img/fantastic-beasts-the-crimes-of-grindelwald.jpg'}
            name={'Fantastic Beasts: The Crimes of Grindelwald'}
          />

          <FilmCard
            img={'img/bohemian-rhapsody.jpg'}
            name={'Bohemian Rhapsody'}
          />

          <FilmCard
            img={'img/macbeth.jpg'}
            name={'Macbeth'}
          />

          <FilmCard
            img={'img/aviator.jpg'}
            name={'Aviator'}
          />

          <FilmCard
            img={'img/we-need-to-talk-about-kevin.jpg'}
            name={'We need to talk about Kevin'}
          />

          <FilmCard
            img={'img/what-we-do-in-the-shadows.jpg'}
            name={'What We Do in the Shadows'}
          />

          <FilmCard
            img={'img/revenant.jpg'}
            name={'Revenant'}
          />

          <FilmCard
            img={'img/johnny-english.jpg'}
            name={'Johnny English'}
          />

          <FilmCard
            img={'img/shutter-island.jpg'}
            name={'Shutter Island'}
          />
        </div>
      </section>
      <Footer />
    </div>
  );
}
