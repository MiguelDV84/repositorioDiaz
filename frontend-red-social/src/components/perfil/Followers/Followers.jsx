import { useState } from "react";
import { useFetch } from "../../../customHook/useFetch";
import { Link, useNavigate } from "react-router-dom";

import "./Followers.css";
import FooterMenu from "./../../menu/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ButtonPrimary from "../../buttons/ButtonPrimary";
import ImageUser from "../../utils/Image/ImageUser";
import Header from "../../utils/Header/Header";
import ProfileItem from "../../utils/ProfileItem/ProfileItem";

export default function Followers() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const API = "http://localhost:3001/api";

  const navigate = useNavigate();

  const { data: follows, error: errorFollows } = useFetch({
    api: API + "/follow/followers/" + user.id,
    token,
  });

  if (errorFollows) {
    return <div>Error al obtener los seguidores</div>;
  }

  if (!follows) {
    return <div>Cargando seguidores...</div>;
  }

  const followers = follows?.follows;

  return (
    <div className="followers">
      <Header text={`Seguidores de ${user?.nick}`} back={true} />

      <div className="followers__container--followers">
        {followers?.map((follower) => (
          <div key={follower.user?._id} className="followers__item">
            <Link to={`/perfil/${follower.user?._id}`}>
              <ProfileItem
                className="followers__image"
                image={follower.user?.image}
                nick={follower.user?.nick}
                textButton="Eliminar"
              />
            </Link>
          </div>
        ))}
      </div>
      <FooterMenu />
    </div>
  );
}
