type PlayerButtonProps = {
  isPlay: boolean;
}

function PlayerButton(props: PlayerButtonProps) {
  const { isPlay } = props;

  return (
    <>
      <svg viewBox="0 0 19 19" width="19" height="19">
        { isPlay ? <use xlinkHref="#play-s"/> : <use xlinkHref="#pause"/>}
      </svg>
      { isPlay ? <span>Play</span> : <span>Pause</span> }
    </>
  );
}

export default PlayerButton;
