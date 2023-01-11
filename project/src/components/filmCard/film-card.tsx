import { FC, useEffect, useState} from 'react';
import VideoPlayer from '../video/video-player';
import {Film} from '../../types/film';
import {Link} from 'react-router-dom';

type Props = {
  film: Film;
  onMouseEnter: (film: Film) => void;
}

const FilmCard: FC<Props> = (props) => {
  const { film, onMouseEnter } = props;
  const [playing, setPlaying] = useState<boolean>(false);
  const [needPlaying, setNeedPlaying] = useState<boolean>(false);

  useEffect(() => {
    let needUpdate = true;

    if (needPlaying) {
      setTimeout(() => needUpdate && setPlaying(true), 1000);
    }

    return () => {needUpdate = false;};
  }, [needPlaying]);

  const handleMouseLeave = () => {
    setNeedPlaying(false);
    setPlaying(false);
  };

  return(
    <Link
      to={`/films/${film.id}`}
      className="small-film-card catalog__films-card small-film-card__link"
      onMouseEnter={(evt) => {
        onMouseEnter(film);
        setNeedPlaying(true);
      }}
      onMouseLeave={handleMouseLeave}
    >
      <div>
        <VideoPlayer
          film={film}
          needSound={false}
          isPlaying={playing}
          width={280}
          height={175}
        />
      </div>
      <h3 className="small-film-card__title">{film.name}</h3>
    </Link>
  );
};

export default FilmCard;
