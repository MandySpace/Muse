import axios from "axios";
import Data from "./Data";
import { motion } from "framer-motion";
import { fadeAnim } from "../animation";

function LibrarySong({
  audioRef,
  song,
  setCurrentSong,
  setIsPlaying,
  songs,
  setSongs,
  token,
  setIsLoading,
}) {
  async function setCurrentSongHandler() {
    try {
      if (song.type === "playlist") {
        setIsLoading(true);
        axios
          .get(song.tracks.href, {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            setSongs(Data(res.data));
            setIsLoading(false);
          })
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
    <motion.div
      variants={fadeAnim(0.2)}
      onClick={setCurrentSongHandler}
      className={`library-song ${song.active ? "selected" : ""}`}
    >
      <img src={song.images[0]?.url} alt="Cover pic of the album" />
      <div className="song-info">
        <h3>{song.name}</h3>
        <h4>{song.artists}</h4>
      </div>
    </motion.div>
  );
}

export default LibrarySong;
