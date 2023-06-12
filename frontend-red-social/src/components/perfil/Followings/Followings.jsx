import { useState } from "react";
import { useFetch } from "../../../customHook/useFetch";
import { Link, useNavigate } from "react-router-dom";
import FooterMenu from "./../../menu/Menu";
import "./Followings.css";

import Header from "../../utils/Header/Header";
import ButtonPrimary from "../../buttons/ButtonPrimary";
import ImageUser from "../../utils/Image/ImageUser";
import ProfileItem from "../../utils/ProfileItem/ProfileItem";

export default function Followings() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const API = "http://localhost:3001/api";

  const navigate = useNavigate();

  const { data: follows, error: errorFollowings } = useFetch({
    api: API + "/follow/following/" + user.id,
    token,
  });

  if (errorFollowings) {
    return <div>Error al obtener los seguidos</div>;
  }

  if (!follows) {
    return <div>Cargando seguidos...</div>;
  }

  const followings = follows.follows;
  console.log(followings[0].followed);

  return (
    <div className="followings">
      <Header text={`Seguidos de ${user?.nick}`} back={true} />

      <div className="followings__container--following">
        {followings?.map((following) => (
          <div key={following.followed?._id} className="following__item">
            <Link
              to={`/perfil/${following.followed?._id}`}
              onClick={() =>
                localStorage.setItem("userId", following.followed?._id)
              }
            >
              <ProfileItem
                className={"following__image"}
                image={following?.followed?.image}
                nick={following?.followed?.nick}
              />
            </Link>
            <ButtonPrimary text={"Eliminar"} />
          </div>
        ))}
      </div>
      <FooterMenu />
    </div>
  );
}
