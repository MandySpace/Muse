import axios from "axios";
import { useEffect, useState } from "react";
import Data from "./Data";

const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";

function SpotifyGetPlaylist({ loggedIn, setPlaylists }) {
  const [token, setToken] = useState("");

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setToken(localStorage.getItem("accessToken"));
    }
  }, []);

  //"https://api.spotify.com/v1/playlists/1WbMHg9PKgK2ENxjdXhZL7/tracks"

  useEffect(() => {
    if (loggedIn) {
      axios
        .get(PLAYLISTS_ENDPOINT, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => setPlaylists(Data(res.data)))
        .catch((err) => console.error(err));
    }
  }, [loggedIn]);

  return null;
}

export default SpotifyGetPlaylist;
