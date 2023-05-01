import { useState, useContext } from "react";
import axios from "axios";
import "./login.css";
import { TokenContext } from "../../customHook/TokenContext";
import useLocalStorage from "../../customHook/useLocalStorage";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();
  const [token, setToken] = useLocalStorage("token");
  const API = "http://localhost:3001/api/user/login";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        API,
        JSON.stringify({ email: email, password: password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setToken(response.data.token);
      /*  debugger; */
    } catch (error) {
      if (!error.response) {
        console.log(error.message);
        setMessage(error.response.data.message);
      } else {
        console.log(error.response.data.message);
        setMessage(error.response.data.message);
      }
    }
  };

  return (
    <div className="login__container-main">
      <form onSubmit={handleSubmit} className="login__container-form">
        <h3>Login</h3>
        {message && (
          <div className="login__container-error">
            <span>{message}</span>
          </div>
        )}
        <div className="login__container-input">
          <p>E-mail:</p>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="login__container-input">
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="login__container-btn">
          <button>Login</button>
        </div>
      </form>
    </div>
  );
}
