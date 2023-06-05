import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/login";
import Feed from "./components/feed/Feed";
import Menu from "./components/menu/Menu";
import Perfil from "./components/perfil/Perfil";
import Followings from "./components/perfil/Followings/Followings";
import Followers from "./components/perfil/Followers/Followers";
import Upload from "./components/Upload/Upload";

import ProtectedRoute from "./components/utils/ProtectedRoute";

import "./App.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));


  useEffect(() => {
    console.log(user?.id)
    setToken(localStorage.getItem("token"));
  }, [token]);

  return (
    <Router>
      <div className="App">
        {token && <Menu />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/seguidos" element={<Followings />} />
          <Route path="/seguidores" element={<Followers />} />
          <Route path="/upload" element={<Upload userId={user?.id} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
