import React, { useEffect, useState } from "react";
import ImageUser from "../utils/Image/ImageUser";
import "./Perfil.css";
import ButtonPrimary from "../buttons/ButtonPrimary";

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
            <span>12</span>
            <span>SEGUIDOS</span>
          </div>
          <div className="container__statistics--posts">
            <span>12</span>
            <span>SEGUIDORES</span>
          </div>
        </div>
      </div>

      <div className="profile__container--info">
        <h4>{user.name} {user.surname}</h4>
        <span>Desarrollador Web </span>
        <span>
           Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed tenetur dolor dicta fugit, 
           enim dolores! Voluptatem eius omnis magnam accusamus itaque sit deserunt voluptate nihil? Accusantium fuga praesentium magnam perferendis!  ----- 
        </span>
        <h4>Site/Web</h4>
        <a href="/">https://www.linkedin.com/migueldiaz</a>
      </div>
     
      <div className="profile__container--btn">
        <ButtonPrimary text={'Editar Perfil'}/>
        <ButtonPrimary text={'Configuración'}/>
      </div>
    </div>
    
  );
}
