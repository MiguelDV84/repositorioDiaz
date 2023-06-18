import { useState, useEffect, useRef } from "react";
import { useFetch } from "../../customHook/useFetch";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import ImageUser from "../utils/Image/ImageUser";
import ImagePubli from "../utils/Image/ImagePubli";

import ButtonPrimary from "../buttons/ButtonPrimary";
import FooterMenu from "./../menu/Menu";

import SearchContext from "../../customHook/TokenContext";

import "./Perfil.css";
import Header from "../utils/Header/Header";

export default function Perfil({ userProp }) {
  const [totalPost, setTotalPost] = useState();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const { id } = useParams();

  const API = "http://localhost:3001/api";

  const { data: followings, error: errorFollowings } = useFetch({
    api: API + "/follow/following/" + id,
    token,
  });
  const { data: followers, error: errorFollowers } = useFetch({
    api: API + "/follow/followers/" + id,
    token,
  });

  const { data: posts, error: errorPosts } = useFetch({
    api: API + "/post/user/" + id,
    token,
  });

  const { data: profile, error: errorUser } = useFetch({
    api: API + "/user/profile/" + id,
    token,
  });

  const inputFileRef = useRef(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        API + "/user/change-profile-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedUser = { ...user, image: response.data.imageName };
      setUser(updatedUser);

      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Error al cambiar la imagen de perfil:", error);
    }
  };

  const openFileInput = () => {
    inputFileRef.current.click();
  };

  return (
    <>
      <Header text={`Perfil de ${user?.nick}`} back={true} />
      <div className="profile">
        <div className="profile__container">
          <div className="profile__image">
            <ImageUser
              imageName={profile?.user.image}
              onClick={openFileInput}
            />
            {user.id === profile?.user._id && (
              <input
                type="file"
                accept="image/*"
                onChange={handleProfileImageChange}
                style={{ display: "none" }}
                ref={inputFileRef}
              />
            )}
          </div>

          <div className="profile__container--statistics">
            <div className="container__statistics--posts">
              <span>{errorPosts ? "N/A" : posts?.total}</span>
              <span>PUBLICACIONES</span>
            </div>
            <div className="container__statistics--posts">
              <Link to="/seguidos">
                <span>{errorFollowings ? "N/A" : followings?.total}</span>
              </Link>
              <span>SEGUIDOS</span>
            </div>
            <div className="container__statistics--posts">
              <Link to="/seguidores">
                <span>{errorFollowers ? "N/A" : followers?.total}</span>
              </Link>
              <span>SEGUIDORES</span>
            </div>
          </div>
        </div>

        <div className="profile__container--info">
          <h4>
            {profile?.user.name} {profile?.user.nick}
          </h4>
          <span>Desarrollador Web </span>
        </div>
        {user.id === profile?.user._id ? (
          <div className="profile__container--btn">
            <Link to={"/edit-profile"}>
              {" "}
              <ButtonPrimary text={"Editar Perfil"} />
            </Link>
          </div>
        ) : null}

        <div className="profile__container--section">
          <h4>PUBLICACIONES</h4>
        </div>
        <div className="profile__container--grid">
          {posts?.publications.map((post) => (
            <div key={post._id} className="publication__item">
              {post.file && (
                <Link
                  to="/post"
                  onClick={() => localStorage.setItem("postId", post._id)}
                >
                  <ImagePubli imageName={post.file} />
                </Link>
              )}
            </div>
          ))}
        </div>
        <FooterMenu />
      </div>
    </>
  );
}
