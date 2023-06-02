import { useState } from "react";
import { useFetch } from "../../../customHook/useFetch";
import { useNavigate } from "react-router-dom";

import "./Followers.css";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ButtonPrimary from "../../buttons/ButtonPrimary";
import ImageUser from "../../utils/Image/ImageUser";

export default function Followings() {
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

  const followers = follows.follows;
  console.log(followers[0].user.nick);

  return (
    <div className="followings">
      <div className="followings__header">
          <ArrowBackIcon
            onClick={() => navigate(-1)}
            style={{ cursor: "pointer" }}
          />
          <span>Seguidores de {user?.nick}</span>
      </div>

      <div className="followings__container--following">
        {followers?.map((follower) => (
          <div key={follower.user._id} className="following__item">
            <div className="following__image">
              <ImageUser imageName={follower.user.image} />
            </div>

            <span>{follower.user.nick}</span>

            <ButtonPrimary text={"Eliminar"} />
          </div>
        ))}
      </div>
    </div>
  );
}
