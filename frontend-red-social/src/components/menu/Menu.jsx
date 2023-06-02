import React, {useState} from "react";
import { Link } from "react-router-dom";
import UpIcon from '@mui/icons-material/AddToPhotos';
import ProfileIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';

import "./Menu.css";

export default function Menu() {

  const [token, setToken] = useState(localStorage.getItem("token"));



  const handleLogout = () => {
    setToken(null);
  };
  
  return (
    <nav class="menu">
        <li class="menu__item menu__item--home"><Link to='/feed'><HomeIcon/></Link></li>
        <li class="menu__item menu__item--perfil"><Link to='/perfil'><ProfileIcon/></Link></li>
        <li class="menu__item menu__item--perfil"><Link to='/upload'><UpIcon/></Link></li>
        <li class="menu__item menu__item--perfil"><Link to='/upload'><SearchIcon/></Link></li>

        <li class="menu__item menu__item--logout" onClick={handleLogout}><Link to='/'><LogoutIcon/></Link></li>

    </nav>
  );
}
