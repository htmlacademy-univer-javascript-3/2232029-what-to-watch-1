import Header from '../../components/header/header';
import FilmCard from '../../components/filmCard/film-card';
import Footer from '../../components/footer/footer';

const HREF_DEFAULT = 'film-page.html';
export default function MyListPage(): JSX.Element {
  return (
    <div className='user-page'>
      <Header />

      <section className='catalog'>
        <h2 className='catalog__title visually-hidden'>Catalog</h2>
        <div className='catalog__films-list'>
          <FilmCard
            img={'img/fantastic-beasts-the-crimes-of-grindelwald.jpg'}
            name={'Fantastic Beasts: The Crimes of Grindelwald'}
            href={HREF_DEFAULT}
          />

          <FilmCard
            img={'img/bohemian-rhapsody.jpg'}
            name={'Bohemian Rhapsody'}
            href={HREF_DEFAULT}
          />

          <FilmCard
            img={'img/macbeth.jpg'}
            name={'Macbeth'}
            href={HREF_DEFAULT}
          />

          <FilmCard
            img={'img/aviator.jpg'}
            name={'Aviator'}
            href={HREF_DEFAULT}
          />

          <FilmCard
            img={'img/we-need-to-talk-about-kevin.jpg'}
            name={'We need to talk about Kevin'}
            href={HREF_DEFAULT}
          />

          <FilmCard
            img={'img/what-we-do-in-the-shadows.jpg'}
            name={'What We Do in the Shadows'}
            href={HREF_DEFAULT}
          />

          <FilmCard
            img={'img/revenant.jpg'}
            name={'Revenant'}
            href={HREF_DEFAULT}
          />

          <FilmCard
            img={'img/johnny-english.jpg'}
            name={'Johnny English'}
            href={HREF_DEFAULT}
          />

          <FilmCard
            img={'img/shutter-island.jpg'}
            name={'Shutter Island'}
            href={HREF_DEFAULT}
          />
        </div>
      </section>
      <Footer />
    </div>
  );
}
