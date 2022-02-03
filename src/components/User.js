import axios from "axios";
import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

function User({ setUserData, userData, token, setDispLib, setLoggedIn }) {
  useEffect(() => {
    if (token) {
      axios
        .get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          setUserData(res.data);
        })
        .catch((err) => console.error("From User.js " + err));
    }
  }, [token, setUserData]);

  const closeUserMenu = (e) => {
    if (
      !(
        e.target.classList.contains("user-img") ||
        e.target.classList.contains("checkbox-user") ||
        e.target.classList.contains("checkbox")
      )
    ) {
      if (checkboxRef.current) checkboxRef.current.checked = false;
    }
  };

  useEffect(() => {
    window.addEventListener("click", closeUserMenu);
    return () => window.removeEventListener("click", closeUserMenu);
  }, []);

  const checkboxRef = useRef(null);

  return (
    <div className="user">
      <form action="#">
        <input
          ref={checkboxRef}
          className="checkbox-user checkbox"
          type="checkbox"
          id="user-toggle"
        />

        <label htmlFor="user-toggle" className="user-checkbox-label">
          <img
            src={userData?.images[0].url}
            alt="Owners pic"
            className="user-img"
          />
        </label>

        <div>
          <input
            className="checkbox-lib checkbox"
            type="checkbox"
            id="lib-toggle"
          />
          <label
            className="lib-checkbox-label"
            htmlFor="lib-toggle"
            onClick={() => {
              setDispLib((prevState) => !prevState);
              checkboxRef.current.checked = false;
            }}
          >
            <FontAwesomeIcon size="2x" icon={faMusic} />
          </label>
          <div className="sign-out" onClick={() => setLoggedIn(false)}>
            <FontAwesomeIcon size="2x" icon={faSignOutAlt} />
          </div>
        </div>
      </form>
    </div>
  );
}

export default User;
