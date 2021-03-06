import girl from "../girl.svg";

const CLIENT_ID = "0df5782ff13e4b0389221a08ff5be16d";
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN = "https://muse-music-player.netlify.app/";

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
      <div className="svg-cont">
        <img src={girl} alt="" className="svg" />
      </div>
    </div>
  );
}

export default SpotifyLogin;
