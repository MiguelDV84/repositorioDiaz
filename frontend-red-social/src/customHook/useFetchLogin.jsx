import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function useFetchLogin({ API, email, password }) {
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const response = await axios.post(
        API,
        JSON.stringify({ email: email, password: password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setUser(localStorage.getItem("user"));
      navigate("/feed");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    getData();
  }, []); // Ejecuta getData solo una vez al montar el componente

  return { user, error };
}
