import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import SearchResultsDropDown from "./SearchResultsDropDown";
import axios from "axios";
import User from "./User";

function Nav({ dispLib, setDispLib, setCurrentSong }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryResults, setSearchQueryResults] = useState([]);

  useEffect(() => {
    if (searchQuery === "") return setSearchQueryResults([]);
    axios
      .get(`https://api.spotify.com/v1/search?q=${searchQuery}&type=track`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      })
      .then((res) => setSearchQueryResults(parseData(res.data)))
      .catch((err) => console.error(err));
  }, [searchQuery]);

  const parseData = (data) => {
    const { items } = data.tracks;
    return items
      .filter((item) => item.preview_url !== null)
      .map((item) => {
        const { name, preview_url, type, id } = item;
        const { images, name: album } = item.album;
        const artists = item.artists
          .map((artist) => artist.name)
          .slice(0, 3)
          .join(", ");
        return {
          images,
          name,
          preview_url,
          album,
          artists,
          type,
          id,
          active: false,
        };
      });
  };

  const searchHandler = (e) => {
    e.preventDefault();
  };

  return (
    <nav className="nav">
      <h1>Muse</h1>
      <form action="#" className="search-flex">
        <input
          className="search"
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          placeholder="Search for tracks/artists"
        />
        <button className="search-btn" onClick={searchHandler}>
          <FontAwesomeIcon size="2x" icon={faSearch} />
        </button>
        <SearchResultsDropDown
          searchQueryResults={searchQueryResults}
          setCurrentSong={setCurrentSong}
        />
      </form>
      <form action="#">
        <input
          className="checkbox-lib checkbox"
          type="checkbox"
          id="lib-toggle"
        />
        <label
          className="lib-checkbox-label"
          htmlFor="lib-toggle"
          onClick={() => setDispLib(!dispLib)}
        >
          <FontAwesomeIcon size="2x" icon={faMusic} />
        </label>
      </form>
      <User className="user" />
    </nav>
  );
}

export default Nav;
