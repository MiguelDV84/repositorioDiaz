import React, { useState, useEffect } from "react";
import axios from "axios";
import ImagePubli from "../utils/Image/ImagePubli";
import ImageUser from "../utils/Image/ImageUser";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Header from "../utils/Header/Header";
import FooterMenu from "../menu/Menu";
import "./Feed.css";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const API = "http://localhost:3001/api/post/feed";
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [likes, setLikes] = useState({}); // Objeto para almacenar los contadores de likes por publicación
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

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
          setMessage(error.message);
        } else {
          console.log(error);
          setMessage(error.response.data.message);
        }
      }
    };
    getPosts();
  }, [token]);

  useEffect(() => {
    const getLikesCount = async () => {
      try {
        const likeCounts = {};
        for (const post of posts) {
          const response = await axios.get(
            `http://localhost:3001/api/like/likes/${post._id}`,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          const likeCount = response.data.count;
          likeCounts[post._id] = likeCount;
        }
        setLikes(likeCounts);
      } catch (error) {
        console.log(error);
      }
    };
    getLikesCount();
  }, [posts, token]);

  const handleLike = async (postId, userId) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/like/save/${userId}`,
        { publication: postId },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header text={`Feed`} back={false} />
      <div className="feed__container--main">
        {posts.length > 0 ? (
          posts.map((item, i) => (
            <article key={i}>
              <header className="feed__header--user">
                <div className="feed__section--user">
                  <div className="user__image">
                    <ImageUser imageName={item.user.image} />
                  </div>
                  <h4>{item.user.nick}</h4>
                </div>
              </header>
              <section>
                <div className="feed__container--image">
                  <ImagePubli imageName={item.file} />
                </div>
                <div className="feed__container--icons">
                  <FavoriteIcon
                    onClick={() => handleLike(item._id, user.id)}
                  />
                  <span>{likes[item._id]}</span> {/* Mostrar contador de likes */}
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
      </div>
      <FooterMenu />
    </>
  );
}
