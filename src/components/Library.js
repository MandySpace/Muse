import LibrarySong from "./LibrarySong";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Data from "./Data";

function Library({
  audioRef,
  songs,
  setSongs,
  setCurrentSong,
  setIsPlaying,
  dispLib,
  playlists,
}) {
  const goBackHandler = () => {
    // axios
    //   .get("https://api.spotify.com/v1/me/playlists", {
    //     headers: {
    //       Authorization: "Bearer " + localStorage.getItem("accessToken"),
    //     },
    //   })
    //   .then((res) => setSongs(Data(res.data)))
    //   .catch((err) => console.error(err));
    setSongs(playlists);
  };

  return (
    <div className={`library ${dispLib ? "library-lib-active" : ""}`}>
      <div className="lib-header">
        <h2 className="lib-title">Library</h2>
        <FontAwesomeIcon
          icon={faArrowLeft}
          size="2x"
          className={`back-icon ${
            songs[0]?.type === "playlist" ? "hide-back-icon" : ""
          }`}
          onClick={goBackHandler}
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
          />
        ))}
      </div>
    </div>
  );
}

export default Library;
