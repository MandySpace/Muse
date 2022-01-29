import { useState, useEffect } from "react";
import SearchResultsDropDown from "./SearchResultsDropDown";
import axios from "axios";
import User from "./User";

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
      };
    });
};

function Nav({
  dispLib,
  setDispLib,
  setCurrentSong,
  audioRef,
  setIsPlaying,
  songs,
  userData,
  setUserData,
  token,
  setLoggedIn,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryResults, setSearchQueryResults] = useState([]);

  useEffect(() => {
    if (searchQuery === "") return setSearchQueryResults([]);
    axios
      .get(`https://api.spotify.com/v1/search?q=${searchQuery}&type=track`, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then((res) => setSearchQueryResults(parseData(res.data)))
      .catch((err) => console.error(err));
  }, [searchQuery, token]);

  const homeHandler = () => {
    setIsPlaying(false);
    audioRef.current.pause();
    setCurrentSong();
  };

  return (
    <nav className="nav">
      <h1 onClick={homeHandler}>
        Muse <div className="underline"></div>{" "}
      </h1>

      <div className="search-flex">
        <input
          className="search"
          onChange={(e) => setSearchQuery(e.target.value)}
          type="search"
          value={searchQuery}
          placeholder="Search for tracks/artists..."
        />

        <SearchResultsDropDown
          searchQueryResults={searchQueryResults}
          setCurrentSong={setCurrentSong}
          audioRef={audioRef}
          setIsPlaying={setIsPlaying}
          setSearchQuery={setSearchQuery}
          songs={songs}
        />
      </div>

      <User
        className="user"
        userData={userData}
        setUserData={setUserData}
        token={token}
        dispLib={dispLib}
        setDispLib={setDispLib}
        setLoggedIn={setLoggedIn}
      />
    </nav>
  );
}

export default Nav;
