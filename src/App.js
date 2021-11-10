import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";
import SpotifyGetPlaylist from "./components/SpotifyGetPlaylist";
import SpotifyLogin from "./components/SpotifyLogin";
import "./styles/app.scss";
import { useState, useRef, useEffect } from "react";

function App() {
  //STATE HOOKS

  const [loggedIn, setLoggedIn] = useState(false);
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [currentSong, setCurrentSong] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  const [dispLib, setDispLib] = useState(false);

  //REF HOOKS

  const audioRef = useRef(null);

  //USE EFFECT

  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } =
        getreturendParamsFromSpotifyAuth(window.location.hash);
      localStorage.clear();
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("expiresIn", expires_in);
      localStorage.setItem("tokenType", token_type);
      setLoggedIn(true);
    }
  }, []);

  useEffect(() => setSongs(playlists), [playlists]);

  //HANDLERS

  const timeUpdateHandler = (e) => {
    setSongInfo({
      ...songInfo,
      currentTime: e.target.currentTime,
      duration: e.target.duration,
    });
  };

  const songEndedHandler = async () => {
    if (currentSong.active === undefined) {
      setSongInfo({
        ...songInfo,
        currentTime: 0,
      });
      setIsPlaying(false);
      return;
    }
    const curSongIndex = songs.indexOf(currentSong);
    songs[curSongIndex].active = false;
    const nextIndex = curSongIndex + 1 >= songs.length ? 0 : curSongIndex + 1;
    songs[nextIndex].active = true;
    await setCurrentSong(songs[nextIndex]);

    audioRef.current.play();
  };

  //FUNCTIONS
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

  //JSX

  return (
    <div className={`App ${dispLib ? "App-lib-active" : ""}`}>
      <div className={`log-in-page ${loggedIn ? "hidden" : ""}`}>
        <SpotifyLogin />
      </div>

      <div
        className={`app-container ${loggedIn ? "" : "hidden"} ${
          dispLib ? "app-container-lib-active" : ""
        }`}
      >
        <Nav
          setDispLib={setDispLib}
          dispLib={dispLib}
          setCurrentSong={setCurrentSong}
        />

        <Library
          songs={songs}
          setCurrentSong={setCurrentSong}
          audioRef={audioRef}
          setIsPlaying={setIsPlaying}
          dispLib={dispLib}
          setSongs={setSongs}
          playlists={playlists}
        />
        {currentSong ? (
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
        ) : (
          ""
        )}

        <audio
          ref={audioRef}
          src={currentSong?.preview_url}
          onTimeUpdate={timeUpdateHandler}
          onLoadedMetadata={timeUpdateHandler}
          onEnded={songEndedHandler}
        ></audio>

        <SpotifyGetPlaylist
          loggedIn={loggedIn}
          setSongs={setSongs}
          setPlaylists={setPlaylists}
        />
      </div>
    </div>
  );
}

export default App;
