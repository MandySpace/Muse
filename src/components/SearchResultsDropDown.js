import { useRef, useEffect } from "react";

function SearchResultsDropDown({
  searchQueryResults,
  setCurrentSong,
  audioRef,
  setIsPlaying,
  setSearchQuery,
  songs,
  onShowModal,
}) {
  const clickOutsideRef = useRef(null);

  const playSearchResultHandler = async (result) => {
    try {
      // Check if the track has a preview URL
      if (!result.preview_url) {
        // Show custom modal instead of window.confirm
        onShowModal(result);
        return;
      }

      await setCurrentSong(result);
      setSearchQuery("");
      setIsPlaying(true);

      // Add a small delay to ensure the audio src is updated
      setTimeout(() => {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
          setIsPlaying(false);
          alert("Unable to play this track. Please try another song.");
        });
      }, 100);

      songs.forEach((song) => (song.active = false));
    } catch (error) {
      console.error("Error in playSearchResultHandler:", error);
      setIsPlaying(false);
      alert("An error occurred while trying to play the track.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      // Only clear search if we have results and clicked outside the dropdown and search input
      if (
        searchQueryResults.length > 0 &&
        clickOutsideRef.current &&
        !clickOutsideRef.current.contains(e.target) &&
        !e.target.classList.contains("search")
      ) {
        setSearchQuery("");
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [searchQueryResults, setSearchQuery]);

  return (
    <div ref={clickOutsideRef} className="drop-down">
      {searchQueryResults
        .filter((result) => result.name && result.id)
        .map((result) => {
          return (
            <div
              onClick={() => playSearchResultHandler(result)}
              className={`results ${!result.preview_url ? "no-preview" : ""}`}
              key={result.id}
              title={
                !result.preview_url
                  ? "Click to open in Spotify"
                  : "Click to play preview"
              }
            >
              <img
                src={
                  result.images?.[2]?.url ||
                  result.images?.[1]?.url ||
                  result.images?.[0]?.url ||
                  ""
                }
                alt="Album Cover"
                className="results-img"
              />
              <div className="results-info">
                <h3>
                  {result.name}{" "}
                  {!result.preview_url && (
                    <span className="no-preview-indicator">🎵</span>
                  )}
                </h3>
                <h4>{result.artists}</h4>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default SearchResultsDropDown;
