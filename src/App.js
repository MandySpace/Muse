import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";
import SpotifyGetPlaylist from "./components/SpotifyGetPlaylist";
import "./styles/app.scss";
import data from "./data";
import { useState, useRef, useEffect } from "react";

const CLIENT_ID = "0df5782ff13e4b0389221a08ff5be16d";
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/";

const SCOPES = [
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-read-playback-state",
];

const SPACE_DELIMITER = "%20";
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

const getreturendParamsFromSpotifyAuth = (hash) => {
  const stringAfterHashtag = hash.substring(1);
  const paramsInURL = stringAfterHashtag.split("&");
  const paramsSplitUp = paramsInURL.reduce((acc, cur) => {
    const [key, value] = cur.split("=");
    acc[key] = value;
    return acc;
  }, {});
  return paramsSplitUp;
};

function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  const [dispLib, setDispLib] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } =
        getreturendParamsFromSpotifyAuth(window.location.hash);
      localStorage.clear();
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("expiresIn", expires_in);
      localStorage.setItem("tokenType", token_type);
    }
  }, []);

  const timeUpdateHandler = (e) => {
    setSongInfo({
      ...songInfo,
      currentTime: e.target.currentTime,
      duration: e.target.duration,
    });
  };

  const songEndedHandler = async () => {
    const curSongIndex = songs.indexOf(currentSong);
    songs[curSongIndex].active = false;
    await setCurrentSong(songs[curSongIndex + 1]);
    songs[curSongIndex + 1].active = true;
    audioRef.current.play();
  };

  const handleLogin = () => {
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
  };

  return (
    <div className={`App ${dispLib ? "App-lib-active" : ""}`}>
      <Nav setDispLib={setDispLib} dispLib={dispLib} />
      <Library
        songs={songs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        setIsPlaying={setIsPlaying}
        dispLib={dispLib}
      />
      <div
        className={`player-container ${
          dispLib ? "player-container-lib-active" : ""
        }`}
      >
        <Song currentSong={currentSong} />
        <Player
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          audioRef={audioRef}
          songInfo={songInfo}
          setSongInfo={setSongInfo}
          songs={songs}
          setSongs={setSongs}
          dispLib={dispLib}
        />
      </div>
      <audio
        ref={audioRef}
        src={currentSong.audio}
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        onEnded={songEndedHandler}
      ></audio>
      <SpotifyGetPlaylist />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default App;
