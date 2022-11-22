import {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import { FilmShort } from '../../types/film-short';
import VideoPlayer from '../video/video-player';

type Props = {
  film: FilmShort;
  onHover: Dispatch<SetStateAction<number | null>>;
}

const FilmCard: FC<Props> = (props) => {
  const { film, onHover } = props;
  const [playing, setPlaying] = useState<boolean>(false);
  const [needPlaying, setNeedPlaying] = useState<boolean>(false);

  useEffect(() => {
    let needUpdate = true;

    if (needPlaying) {
      setTimeout(() => needUpdate && setNeedPlaying(true), 1000);
    }

    return () => {needUpdate = false;};
  }, [needPlaying]);

  const handleMouseLeave = () => {
    setNeedPlaying(false);
    setPlaying(false);
  };

  return(
    <article
      className="small-film-card catalog__films-card"
      onMouseOver={(_) => {
        setNeedPlaying(true);
        onHover?.((__) => film.id);
      }}
      onMouseLeave={handleMouseLeave}
    >
      <VideoPlayer
        film={film}
        needSound={false}
        isPlaying={playing}
        width={280}
        height={175}
      />
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href={`/films/${film.id}`}>{film.name}</a>
      </h3>
    </article>
  );
};

export default FilmCard;
