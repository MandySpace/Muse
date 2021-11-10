import axios from "axios";
import { useEffect, useState } from "react";

function User() {
  const [userData, setUserData] = useState();

  useEffect(
    () =>
      axios
        .get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        })
        .then((res) => setUserData(res.data))
        .catch((err) => console.error(err)),
    []
  );

  return (
    <div className="user">
      {/* <input
        className="checkbox user-checkbox"
        type="checkbox"
        id="user-info-toggle"
      /> */}
      {/* <label htmlFor="user-info-toggle"> */}
      <img
        src={userData?.images[0].url}
        alt="Owners pic"
        className="user-img"
      />
      {/* </label> */}

      {/* <div className="user-info">
        <h3>Welcome, {userData.display_name}</h3>
        <h4>Followers: {userData.followers.total}</h4>
      </div> */}
    </div>
  );
}

export default User;
