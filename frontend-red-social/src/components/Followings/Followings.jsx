import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ImageUser from "../utils/Image/ImageUser";
import { useFetch } from "../../customHook/useFetch";
import "./Followings.css";
import ButtonPrimary from "../buttons/ButtonPrimary";

export default function Followings() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const API = "http://localhost:3001/api";

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
      <div className="followings__header">
        <ArrowBackIcon />
        <span>Seguidos de Miguel</span>
      </div>

      <div className="followings__container--following">
        {followings?.map((following) => (
          <div key={following.followed._id} className="following__item">
            <div className="following__image">
              <ImageUser imageName={following.followed.image} />
            </div>
            <span>{following.followed.nick}</span>
            <ButtonPrimary text={"Eliminar"} />
          </div>
        ))}
      </div>
    </div>
  );
}
