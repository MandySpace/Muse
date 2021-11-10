import LibrarySong from "./LibrarySong";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faTimes } from "@fortawesome/free-solid-svg-icons";

function Library({
  audioRef,
  songs,
  setSongs,
  setCurrentSong,
  setIsPlaying,
  dispLib,
  setDispLib,
  playlists,
  token,
}) {
  const goBackHandler = () => {
    setSongs(playlists);
  };

  return (
    <div className={`library ${dispLib ? "library-lib-active" : ""}`}>
      <div className="lib-header">
        <h2 className="lib-title">
          {songs[0]?.type === "playlist" ? "Playlists" : "Tracks"}
        </h2>
        <FontAwesomeIcon
          icon={faArrowLeft}
          size="2x"
          className={`back-icon ${
            songs[0]?.type === "playlist" ? "hide-back-icon" : ""
          }`}
          onClick={goBackHandler}
        />

        <FontAwesomeIcon
          icon={faTimes}
          size="2x"
          className="close-icon"
          onClick={() => setDispLib(false)}
        />
      </div>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            song={song}
            songs={songs}
            setCurrentSong={setCurrentSong}
            key={song.id}
            audioRef={audioRef}
            setIsPlaying={setIsPlaying}
            setSongs={setSongs}
            token={token}
          />
        ))}
      </div>
    </div>
  );
}

export default Library;
