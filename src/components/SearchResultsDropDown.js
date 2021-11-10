import { useRef } from "react";

function SearchResultsDropDown({
  searchQueryResults,
  setCurrentSong,
  audioRef,
  setIsPlaying,
  setSearchQuery,
  songs,
}) {
  const clickOutsideRef = useRef(null);

  const playSearchResultHandler = async (result) => {
    await setCurrentSong(result);
    setSearchQuery("");
    setIsPlaying(true);
    audioRef.current.play();
    songs.forEach((song) => (song.active = false));
  };

  document.querySelector("body").addEventListener("click", (e) => {
    if (e.target !== clickOutsideRef) setSearchQuery("");
  });

  return (
    <div ref={clickOutsideRef} className="drop-down">
      {searchQueryResults.map((result) => {
        return (
          <div
            onClick={() => playSearchResultHandler(result)}
            className="results"
            key={result.id}
          >
            <img
              src={result.images[2].url}
              alt="Album Cover"
              className="results-img"
            />
            <div className="results-info">
              <h3>{result.name}</h3>
              <h4>{result.artists}</h4>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SearchResultsDropDown;
