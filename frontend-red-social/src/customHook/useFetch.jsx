import { useEffect, useState } from "react";
import axios from "axios";

export function useFetch({ api, token }) {
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(api, {
          headers: {
            Authorization: token,
          },
        });
        setData(response.data);
      } catch (error) {
        setError(error);
      }
    }

    fetchData();
  }, []);

  return { data, error };
}
