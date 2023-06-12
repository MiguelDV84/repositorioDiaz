import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UpIcon from '@mui/icons-material/AddToPhotos';
import ProfileIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';

import "./Menu.css";

export default function Menu() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const handleLogout = () => {
    // Eliminar el token del almacenamiento local
    localStorage.removeItem("token");
    localStorage.removeItem("user");


    // Redirigir al usuario a la página de inicio o de login
    navigate("/");
  };

  return (
    <nav className="menu">
      <li className="menu__item menu__item--home">
        <Link to="/feed">
          <HomeIcon />
        </Link>
      </li>
      <li className="menu__item menu__item--perfil">
        <Link to={`/perfil/${user.id}`}>
          <ProfileIcon />
        </Link>
      </li>
      <li className="menu__item menu__item--perfil">
        <Link to="/upload">
          <UpIcon />
        </Link>
      </li>
      <li className="menu__item menu__item--perfil">
        <Link to="/search">
          <SearchIcon />
        </Link>
      </li>
      <li className="menu__item menu__item--logout" onClick={handleLogout}>
        <LogoutIcon />
      </li>
    </nav>
  );
}
