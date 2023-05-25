import React, { useEffect, useState } from "react";
import { useFetch } from "../../customHook/useFetch";

import ImageUser from "../utils/Image/ImageUser";
import ButtonPrimary from "../buttons/ButtonPrimary";

import "./Perfil.css";

export default function Perfil() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const API = "http://localhost:3001/api";

  const { data: followings, error: errorFollowings } = useFetch({
    api: API + "/follow/following/" + user.id,
    token,
  });
  const { data: followers, error: errorFollowers } = useFetch({
    api: API + "/follow/followers/" + user.id,
    token,
  });

  console.log(user);

  
  return (
    <div className="profile">
      <div className="profile__container">
        <div className="profile__image">
          <ImageUser imageName={user.image} />
        </div>

        <div className="profile__container--statistics">
          <div className="container__statistics--posts">
            <span>12</span>
            <span>PUBLICACIONES</span>
          </div>
          <div className="container__statistics--posts">
            <span>{errorFollowings ? "N/A" : followings?.total}</span>
            <span>SEGUIDOS</span>
          </div>
          <div className="container__statistics--posts">
            <span>{errorFollowers ? "N/A" : followers?.total}</span>
            <span>SEGUIDORES</span>
          </div>
        </div>
      </div>

      <div className="profile__container--info">
        <h4>
          {user.name} {user.surname}
        </h4>
        <span>Desarrollador Web </span>
        <span>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed tenetur
          dolor dicta fugit, enim dolores! Voluptatem eius omnis magnam
          accusamus itaque sit deserunt voluptate nihil? Accusantium fuga
          praesentium magnam perferendis! -----
        </span>
        <h4>Site/Web</h4>
        <a href="/">https://www.linkedin.com/migueldiaz</a>
      </div>

      <div className="profile__container--btn">
        <ButtonPrimary text={"Editar Perfil"} />
        <ButtonPrimary text={"Configuración"} />
      </div>
    </div>
  );
}
