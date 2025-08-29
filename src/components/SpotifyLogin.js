const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const SPOTIFY_AUTHORIZE_ENDPOINT =
  process.env.REACT_APP_SPOTIFY_AUTHORIZE_ENDPOINT;
const REDIRECT_URL_AFTER_LOGIN =
  process.env.REACT_APP_CLIENT_REDIRECT_URL_AFTER_LOGIN;

const SCOPES = [];
/* "user-modify-playback-state",
  "user-read-currently-playing",
  "user-read-playback-state",*/
const SPACE_DELIMITER = "%20";
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

function SpotifyLogin() {
  //HANDLERS
  const handleLogin = () => {
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
  };

  return (
    <div className="login-page">
      <div className="login-text">
        <h1 className="login-title">Welcome to Muse</h1>
        <p className="login-desc">
          Click on get started to view your favourite playlists and tracks!
        </p>
      </div>
      <button className="login-btn" onClick={handleLogin}>
        Get Started
      </button>
      <div className="login-graphics">
        <div className="music-note music-note-1">♪</div>
        <div className="music-note music-note-2">♫</div>
        <div className="music-note music-note-3">♬</div>
        <div className="music-note music-note-4">♩</div>
        <div className="music-note music-note-5">♪</div>
        <div className="music-note music-note-6">♫</div>
      </div>
    </div>
  );
}

export default SpotifyLogin;
