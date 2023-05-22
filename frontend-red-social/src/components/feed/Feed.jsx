import React, { useState, useEffect } from "react";
import axios from "axios";
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
    <div className="feed__container-main">
      {token ? (
        <div>
          <h3>Feed</h3>
          {posts.length > 0 ? (
            <div className="feed__post-list">
              {posts.map((post) => (
                <div key={post._id}>
                  <p>{post.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No hay publicaciones en el feed.</p>
          )}
        </div>
      ) : null}
    </div>
  );
}
