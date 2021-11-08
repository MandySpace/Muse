import { playAudio } from "../util";

function LibrarySong({ audioRef, song, setCurrentSong, setIsPlaying, songs }) {
  async function setCurrentSongHandler() {
    try {
      songs.forEach((song) => (song.active = false));
      song.active = true;
      setCurrentSong(song);
      playAudio(audioRef, setIsPlaying);
    } catch (err) {
      console.error("🎯" + err);
    }
  }

  return (
    <div
      onClick={setCurrentSongHandler}
      className={`library-song ${song.active ? "selected" : ""}`}
    >
      <img src={song.cover} alt="Cover pic of the album" />
      <div className="song-info">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
}

export default LibrarySong;
