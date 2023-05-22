import React, {useState} from "react";
import { Link } from "react-router-dom";


import "./Menu.css";

export default function Menu() {

  const [token, setToken] = useState(localStorage.getItem("token"));



  const handleLogout = () => {
    setToken(null);
  };
  
  return (
    <nav class="menu">
      <ul>
        <li class="menu__item menu__item--home"><Link to='/feed'>Home</Link></li>
        <li class="menu__item menu__item--perfil"><Link to='/perfil'> Perfil</Link></li>
        <li class="menu__item menu__item--logout" onClick={handleLogout}><Link to='/'> Logout</Link></li>
      </ul>
    </nav>
  );
}
