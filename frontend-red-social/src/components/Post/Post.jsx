import { useFetch } from "../../customHook/useFetch";
import { useEffect, useState } from "react";
import ImagePubli from "../utils/Image/ImagePubli";
import ImageUser from "../utils/Image/ImageUser";
import ListIcon from "@mui/icons-material/List";
import FavIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/MapsUgcRounded";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FooterMenu from "./../menu/Menu";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./Post.css";

export default function Post() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [idPost, setIdPost] = useState(localStorage.getItem("postId"));
  const API = "http://localhost:3001/api";
  const navigate = useNavigate();

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const { data: post, error: errorPost } = useFetch({
    api: API + "/post/get/" + idPost,
    token,
  });

  const { data: profile, error: errorUser } = useFetch({
    api: API + "/user/profile/" + user.id,
    token,
  });

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleDeletePost = async () => {
    try {
      await axios.delete(API + "/post/delete/" + idPost, {
        headers: {
          Authorization: token,
        },
      });
      console.log("Publicación eliminada");
      navigate("/perfil");
    } catch (error) {
      console.log("Error al borrar la publicación", error);
    }
  };

  return (
    <article className="profile__container--main">
      <header className="profile__header--user">
        <div className="profile__section--user">
          <div className="profile__image">
            <ImageUser imageName={profile?.user.image} />
          </div>
          <h4>{profile?.user.nick}</h4>
        </div>
        <ListIcon onClick={handleMenuOpen} />
        <Menu
          anchorEl={menuAnchorEl}
          open={Boolean(menuAnchorEl)}
          onClose={() => setMenuAnchorEl(null)}
        >
          <MenuItem onClick={() => handleDeletePost()}>Borrar</MenuItem>
        </Menu>
      </header>
      <section>
        <div className="profile__container--image">
          <ImagePubli imageName={post?.publication.file} />
        </div>
        <div className="profile__container--icons">
          <FavIcon /> <CommentIcon />
        </div>
        <span>
          <strong>{profile?.user.nick}</strong> {post?.publication.text}
        </span>
      </section>
      <footer>
        <span>{post?.publication.created_at}</span>
      </footer>
      <FooterMenu />
    </article>
  );
}
