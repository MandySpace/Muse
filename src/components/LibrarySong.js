import axios from "axios";
import Data from "./Data";

function LibrarySong({
  audioRef,
  song,
  setCurrentSong,
  setIsPlaying,
  songs,
  setSongs,
}) {
  async function setCurrentSongHandler() {
    try {
      if (song.type === "playlist") {
        axios
          .get(song.tracks.href, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
          })
          .then((res) => setSongs(Data(res.data)))
          .catch((err) => console.error(err));
        return;
      }
      songs.forEach((song) => (song.active = false));
      song.active = true;
      await setCurrentSong(song);
      setIsPlaying(true);
      audioRef.current.play();
    } catch (err) {
      console.error("🎯" + err);
    }
  }

  return (
    <div
      onClick={setCurrentSongHandler}
      className={`library-song ${song.active ? "selected" : ""}`}
    >
      <img src={song.images[0]?.url} alt="Cover pic of the album" />
      <div className="song-info">
        <h3>{song.name}</h3>
        <h4>{song.artists}</h4>
      </div>
    </div>
  );
}

export default LibrarySong;
