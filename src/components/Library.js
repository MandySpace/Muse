import LibrarySong from "./LibrarySong";

function Library({ audioRef, songs, setCurrentSong, setIsPlaying, dispLib }) {
  return (
    <div className={`library ${dispLib ? "library-lib-active" : ""}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            song={song}
            songs={songs}
            setCurrentSong={setCurrentSong}
            key={song.id}
            audioRef={audioRef}
            setIsPlaying={setIsPlaying}
          />
        ))}
      </div>
    </div>
  );
}

export default Library;
