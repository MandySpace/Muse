import { useState, useEffect, useRef } from "react";
import SearchResultsDropDown from "./SearchResultsDropDown";
import axios from "axios";
import User from "./User";

const parseData = (data) => {
  const { items } = data.tracks;
  return items
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
    })
    .sort((a, b) => {
      // Sort tracks with preview URLs first
      if (a.preview_url && !b.preview_url) return -1;
      if (!a.preview_url && b.preview_url) return 1;
      return 0;
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
  onShowModal,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryResults, setSearchQueryResults] = useState([]);
  const debounceRef = useRef(null);

  useEffect(() => {
    if (searchQuery === "") {
      setSearchQueryResults([]);
      return;
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      axios
        .get(
          `https://api.spotify.com/v1/search?q=${searchQuery}&type=track&market=US&limit=50`,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => setSearchQueryResults(parseData(res.data)))
        .catch((err) => console.error(err));
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [searchQuery, token]);

  const homeHandler = () => {
    setIsPlaying(false);
    audioRef.current.pause();
    setCurrentSong();
  };

  const queryHandler = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <nav className="nav">
      <h1 onClick={homeHandler}>
        Muse <div className="underline"></div>{" "}
      </h1>

      <div className="search-flex">
        <input
          className="search"
          onChange={queryHandler}
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
          onShowModal={onShowModal}
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
