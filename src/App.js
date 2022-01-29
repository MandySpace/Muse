import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";
import SpotifyGetPlaylist from "./components/SpotifyGetPlaylist";
import SpotifyLogin from "./components/SpotifyLogin";
import "./styles/app.scss";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Data from "./components/Data";
import { motion } from "framer-motion";
import { fadeAnim } from "./animation";

function App() {
  //STATE HOOKS
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState();
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
  const [isLoading, setIsLoading] = useState(false);

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
      setToken(access_token);
      window.history.replaceState(null, null, " ");
    }
    if (localStorage.getItem("accessToken")) {
      setToken(localStorage.getItem("accessToken"));
      setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    setSongs(playlists);
  }, [playlists]);

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

  const playlistClickHandler = (playlist) => {
    setIsLoading(true);
    axios
      .get(playlist.tracks.href, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        setSongs(Data(res.data));
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
    setDispLib(true);
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
    <motion.div
      variants={fadeAnim(1, 0.2)}
      initial="hidden"
      animate="show"
      className={`App ${dispLib ? "App-lib-active" : ""}`}
    >
      <div className={`log-in-page ${loggedIn ? "hidden" : ""}`}>
        <SpotifyLogin />
      </div>

      <div className={`app-container ${loggedIn ? "" : "hidden"}`}>
        <Nav
          setDispLib={setDispLib}
          dispLib={dispLib}
          setCurrentSong={setCurrentSong}
          audioRef={audioRef}
          setIsPlaying={setIsPlaying}
          songs={songs}
          userData={userData}
          setUserData={setUserData}
          token={token}
          setLoggedIn={setLoggedIn}
        />
        <Library
          songs={songs}
          setCurrentSong={setCurrentSong}
          audioRef={audioRef}
          setIsPlaying={setIsPlaying}
          dispLib={dispLib}
          setDispLib={setDispLib}
          setSongs={setSongs}
          playlists={playlists}
          token={token}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        <div className={`player-container`}>
          {currentSong ? (
            <motion.div variants={fadeAnim}>
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
            </motion.div>
          ) : (
            <motion.div variants={fadeAnim} className={`user-info`}>
              <h2 className="user-name">Welcome, {userData?.display_name}</h2>
              <p className="msg">
                Start by searching for a song or selecting your favourite
                playlist!
              </p>
              <div className="playlist-grid">
                {playlists.map((playlist) => {
                  return (
                    <div
                      onClick={() => playlistClickHandler(playlist)}
                      className="playlist-info"
                      key={playlist.id}
                    >
                      <div className="playlist-img-container">
                        <img
                          className="playlist-img"
                          src={playlist.images[0]?.url}
                          alt=""
                        />
                      </div>
                      <h3 className="playlist-name">{playlist.name}</h3>
                      <h4 className="playlist-type">{playlist.type}</h4>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>
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
          token={token}
          setLoggedIn={setLoggedIn}
        />
      </div>
    </motion.div>
  );
}

export default App;
