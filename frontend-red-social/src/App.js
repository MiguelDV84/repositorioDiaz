import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/login";
import Feed from "./components/feed/Feed";
import Menu from "./components/menu/Menu";
import Perfil from "./components/perfil/Perfil";

import "./App.css";
import ProtectedRoute from "./components/utils/ProtectedRoute";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
