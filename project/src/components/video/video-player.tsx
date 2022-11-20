import {FC, useEffect, useRef} from 'react';
import {FilmShort} from '../../types/film-short';

type Props = {
  film: FilmShort;
  isPlaying: boolean;
  needSound: boolean;
  width: number;
  height: number;
}

const VideoPlayer: FC<Props> = (props) => {
  const { film, isPlaying, needSound, width, height } = props;
  const playerRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (playerRef === null) {
      return;
    }

    if (isPlaying) {
      playerRef.current?.play();
    } else {
      playerRef.current?.load();
    }

  }, [isPlaying]);

  return (
    <video
      ref={playerRef}
      src={film.previewVideoLink}
      poster={film.image}
      muted={!needSound}
      width={width}
      height={height}
    />
  );
};

export default VideoPlayer;
