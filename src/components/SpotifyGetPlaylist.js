import axios from "axios";
import { useEffect, useState } from "react";

const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";

function SpotifyGetPlaylist() {
  const [token, setToken] = useState("");
  const [data, setData] = useState({});

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setToken(localStorage.getItem("accessToken"));
    }
  }, []);

  const handleGetPlaylist = () => {
    axios
      .get(PLAYLISTS_ENDPOINT, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  };

  const handleGetTracks = () => {
    axios
      .get("https://api.spotify.com/v1/tracks/4m9NfjevXsDVaLtM1kj0Sx", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  };

  console.log(data);

  return (
    <div>
      <button onClick={handleGetPlaylist}>Get Playlists</button>
      <button onClick={handleGetTracks}>Get tracks</button>
    </div>
  );
}

export default SpotifyGetPlaylist;
