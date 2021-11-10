function searchResultsDropDown({ searchQueryResults, setCurrentSong }) {
  const playSearchResultHandler = (result) => {
    setCurrentSong({ ...result, active: true });
    console.log(result);
  };

  return (
    <div className="drop-down">
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

export default searchResultsDropDown;
