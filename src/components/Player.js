import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faStepForward,
  faStepBackward,
} from "@fortawesome/free-solid-svg-icons";

function Player({
  songInfo,
  setSongInfo,
  isPlaying,
  setIsPlaying,
  audioRef,
  currentSong,
  setCurrentSong,
  songs,
  dispLib,
}) {
  //FUNCTIONS
  function secondsToTime(secs) {
    secs = Number(secs);
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = Math.floor((secs % 3600) % 60);

    return h > 0
      ? `${h}:${m.toString.padStart(2, "0")}:${s.toString().padStart(2, "0")}`
      : `${m}:${s.toString().padStart(2, "0")}`;
  }
  const animationPercentage = (songInfo.currentTime / songInfo.duration) * 100;

  //HANDLERS
  const playMusicHandler = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      audioRef.current.play();
      return;
    }
    setIsPlaying(false);
    audioRef.current.pause();
  };

  const dragHandler = (e) => {
    setSongInfo({ ...songInfo, currentTime: e.target.value });
    audioRef.current.currentTime = e.target.value;
  };

  const songchangeHandler = async (direction) => {
    if (direction < 0 && songInfo.currentTime > 2) {
      audioRef.current.currentTime = 0;
      return;
    }

    const noOfSongs = songs.length;
    const curSongIndex = songs.indexOf(currentSong);

    const goToSongIndex =
      (curSongIndex +
        (direction > 0 ? direction : curSongIndex === 0 ? noOfSongs - 1 : -1)) %
      noOfSongs;

    songs[curSongIndex].active = false;
    songs[goToSongIndex].active = true;

    await setCurrentSong(songs[goToSongIndex]);
    setIsPlaying(true);
    audioRef.current.play();
  };

  return (
    <div className="player">
      <div
        className={`time-control ${dispLib ? "time-control-lib-active" : ""}`}
      >
        <p>{secondsToTime(songInfo.currentTime)}</p>
        <div className="track">
          <input
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
            type="range"
          />
          <div
            className="animate-track"
            style={{
              transform: `translateX(${animationPercentage}%)`,
            }}
          ></div>
        </div>
        <p>{songInfo.duration ? secondsToTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          className="skip-back"
          size="2x"
          icon={faStepBackward}
          onClick={() => songchangeHandler(-1)}
        />
        <FontAwesomeIcon
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
          onClick={playMusicHandler}
        />
        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faStepForward}
          onClick={() => songchangeHandler(1)}
        />
      </div>
    </div>
  );
}

export default Player;
