function Song({ currentSong }) {
  return (
    <div className="song-container">
      <img src={currentSong.images[0].url} alt="Cover pic of the album" />
      <h2>{currentSong.name}</h2>
      <h4>{currentSong.album}</h4>
      <h3>{currentSong.artists}</h3>
    </div>
  );
}

export default Song;
