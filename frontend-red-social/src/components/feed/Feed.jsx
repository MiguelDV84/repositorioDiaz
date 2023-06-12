import React, { useState, useEffect } from "react";
import axios from "axios";
import ImagePubli from "../utils/Image/ImagePubli";
import ImageUser from "../utils/Image/ImageUser";
import FavIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/MapsUgcRounded";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListIcon from "@mui/icons-material/List";
import FooterMenu from './../menu/Menu'
import "./Feed.css";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState();
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const API = "http://localhost:3001/api/post/feed";
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get(API, {
          headers: {
            Authorization: token,
          },
        });
        setPosts(response.data.publications);
        console.log(response.data.publications);
      } catch (error) {
        if (!error.response) {
          console.log(error);
          setMessage(error.response.data.message);
        } else {
          console.log(error);
          setMessage(error.response.data.message);
        }
      }
    };
    getPosts();
  }, [token]);

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <div className="feed__container--main">
      {posts.length > 0 ? (
        posts.map((item, i) => (
          <article key={i}>
            <header className="feed__header--user">
              <div className="feed__section--user">
                <div className="user__image">
                  <ImageUser imageName={item.user.image} />
                </div>
                <h4> {item.user.nick}</h4>
              </div>
              <ListIcon onClick={handleMenuOpen} />
              <Menu
                anchorEl={menuAnchorEl}
                open={Boolean(menuAnchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => console.log("Opción 1 seleccionada")}>
                  Opción 1
                </MenuItem>
                <MenuItem onClick={() => console.log("Opción 2 seleccionada")}>
                  Opción 2
                </MenuItem>
                <MenuItem onClick={() => console.log("Opción 3 seleccionada")}>
                  Opción 3
                </MenuItem>
              </Menu>
            </header>
            <section>
              <div className="feed__container--image">
                <ImagePubli imageName={item.file} />
              </div>
              <div className="feed__container--icons">
                <FavIcon /> <CommentIcon />
              </div>
              <p>
                <strong>{item.user.nick}</strong> {item.text}
              </p>
            </section>
            <footer>
              <p>{item.created_at}</p>
            </footer>
          </article>
        ))
      ) : (
        <p>No hay publicaciones en el feed.</p>
      )}
      <FooterMenu />
    </div>
  );
}
