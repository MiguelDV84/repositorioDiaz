import React, { useEffect, useState } from "react";
import ImageUser from "../utils/Image/ImageUser";
import './Perfil.css';

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
          console.log(data.user);
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
          <ImageUser imageName={user.image} />
      </div>
    </div>
  );
}
