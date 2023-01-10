import {useAppDispatch, useAppSelector} from '../../hooks';
import {useParams, Link} from 'react-router-dom';
import {getFilm} from '../../store/film-reducer/film-selector';
import {useEffect, useRef, useState} from 'react';
import {fetchFilmById} from '../../store/api-actions';
import moment from 'moment';
import {ROUTES} from '../../routes';
import PauseButton from '../../components/player-button/pause-button';
import PlayerButton from '../../components/player-button/player-button';

export default function PlayerPage() {
  const dispatch = useAppDispatch();
  const params = useParams();
  const film = useAppSelector(getFilm);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [progressBar, setProgressBar] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    dispatch(fetchFilmById(Number(params?.id)));
  }, [params.id, dispatch]);

  const handleIsPlayClick = () => {
    if (videoRef.current?.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current?.pause();
      setIsPlaying(false);
    }
  };

  const handleExpandToFullScreenClick = () => {
    if (videoRef.current?.requestFullscreen) {
      videoRef.current?.requestFullscreen();
    }
  };

  const handleProgressBar = () => {
    const durationTime = videoRef?.current?.duration;
    const currentTime = videoRef?.current?.currentTime;

    if (durationTime && currentTime) {
      setProgressBar((currentTime / durationTime) * 100);
      setTimeLeft(durationTime - currentTime);
    }
  };

  const getTimeLeftInFormat = (seconds: number) => {
    if (seconds / 60 / 60 >= 1) {
      return moment(seconds * 1000).format('-hh:mm:ss');}
    return moment(seconds * 1000).format('-mm:ss');
  };

  if (!film) {
    return <Link to={ROUTES.MAIN}/>;
  }

  return (
    <div className="player">
      <video
        ref={videoRef}
        onTimeUpdate={handleProgressBar}
        src={film.videoLink}
        className="player__video"
        poster={film.backgroundImage}

      />
      <Link to={`/films/${film.id}`} type='button' className='player__exit'>Exit</Link>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={progressBar} max="100"/>
            <div className="player__toggler" style={{left: `${progressBar}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{getTimeLeftInFormat(timeLeft)}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={handleIsPlayClick}>
            { isPlaying ? <PauseButton/> : <PlayerButton/> }
          </button>
          <div className="player__name">{film.name}</div>

          <button type="button" className="player__full-screen" onClick={handleExpandToFullScreenClick}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen">
              </use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}
