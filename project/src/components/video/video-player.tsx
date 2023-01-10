import {FC, useEffect, useRef} from 'react';
import {Film} from '../../types/film';

type Props = {
  film: Film;
  isPlaying: boolean;
  needSound: boolean;
  width: number;
  height: number;
}

const VideoPlayer: FC<Props> = (props) => {
  const { film, isPlaying, needSound, width, height } = props;
  const playerRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!playerRef?.current) {
      return;
    }

    isPlaying
      ? playerRef.current.play()
      : playerRef.current.load();

  }, [isPlaying]);

  return (
    <video
      ref={playerRef}
      src={film.previewVideoLink}
      poster={film.posterImage}
      muted={!needSound}
      width={width}
      height={height}
    />
  );
};

export default VideoPlayer;
