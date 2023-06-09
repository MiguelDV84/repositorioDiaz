import { useState } from "react";
import { Link } from "react-router-dom"
import axios from "axios";
import "./login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();
  const [user, setUser] = useState([]);
  const API = "http://localhost:3001/api/user/login";
  const navigate = useNavigate();




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(API, JSON.stringify({ email: email, password: password }), {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((response) => {
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("token", JSON.stringify(response.data.token));
          setUser(localStorage.getItem('user'))
          navigate('/feed');
        });
    } catch (error) {
      if (!error.response) {
        setMessage(error.response.data.message);
      } else {
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
        <Link to={"/register"}>Ir a Registro</Link>
      </form>
    </div>
  );
}
