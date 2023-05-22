import React, { useState, useEffect } from "react";
import axios from "axios";
import ImagePubli from "../utils/Image/ImagePubli";
import ImageUser from "../utils/Image/ImageUser";
import FavIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/MapsUgcRounded";
import "./Feed.css";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState();
  const API = "http://localhost:3001/api/publi/feed";
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
  return (
    <div className="feed__container--main">
      {posts.length > 0 ? (
        posts.map((item, i) => (
          <article key={i}>
            <header className="feed__header--user">
              <div className="feed__section--user">
                <ImageUser imageName={item.user.image} />
                <h4> {item.user.nick}</h4>
              </div>
              <section>
                <div className="feed__container--image">
                  <ImagePubli imageName={item.file} />
                </div>
                <div className="feed__container--icons">
                  <FavIcon /> <CommentIcon />
                </div>
                <p>{item.text}</p>
              </section>
              <footer>
                <p>{item.created_at}</p>
              </footer>
            </header>
          </article>
        ))
      ) : (
        <p>No hay publicaciones en el feed.</p>
      )}
    </div>
  );
}
