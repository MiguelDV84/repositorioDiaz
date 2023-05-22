import React, { useEffect, useState } from "react";
import profile from "../../../src/assets/image/profile/default.png";

export default function Perfil() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [image, setImage] = useState();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const API = "http://localhost:3001/api/user/profile/";

  useEffect(
    () => {
      const getUser = async () => {
        try {
          const response = await fetch(API + user.id, {
            headers: {
              Authorization: token,
            },
          });
          const data = await response.json();
          console.log(data);
          setImage(data.user.image);
          setUser(data.user);
        } catch (error) {
          console.log(error);
        }
      };
      getUser();
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );
  return (
    <div className="profile">
      <h1>Perfil</h1>
      <div className="profile__container">
        <div className="profile__container-img">
          <img
            src={`../../../../api-rest-red-social/uploads/avatars/${profile}`}
            alt="avatar"
          />
          <h3>{user.nick}</h3>
        </div>
      </div>
    </div>
  );
}
