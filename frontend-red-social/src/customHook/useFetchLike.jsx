import { useState, useEffect } from "react";
import axios from "axios";

const useFetchLikes = ({ publicationId, token }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/like/likes/${publicationId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setLikeCount(response.data.count);
      } catch (error) {
        setError(error.response.data.message);
      }
    };

    fetchLikes();
  }, [publicationId, token]);

  return { likeCount, error };
};

export default useFetchLikes;
