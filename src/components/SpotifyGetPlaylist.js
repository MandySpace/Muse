import axios from "axios";
import { useEffect } from "react";
import Data from "./Data";

const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";

function SpotifyGetPlaylist({ loggedIn, setPlaylists, token, setLoggedIn }) {
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
        .catch(() => setLoggedIn(false));
    }
  }, [loggedIn, token, setLoggedIn, setPlaylists]);

  return null;
}

export default SpotifyGetPlaylist;
