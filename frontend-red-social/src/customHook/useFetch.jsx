import { useEffect, useState } from "react";

export function useFetch({ api, token }) {
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(api, {
          headers: {
            Authorization: token,
          },
        });
        const jsonData = await response.json();
        setData(jsonData);
        console.log(jsonData);
      } catch (error) {
        setError(error);
        console.log(error);
      }
    }

    fetchData();
  }, []);

  return { data, error };
}
