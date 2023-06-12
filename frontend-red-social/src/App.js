import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/login";
import Feed from "./components/feed/Feed";
import Menu from "./components/menu/Menu";
import Perfil from "./components/perfil/Perfil";
import Followings from "./components/perfil/Followings/Followings";
import Followers from "./components/perfil/Followers/Followers";
import Upload from "./components/Upload/Upload";

import ProtectedRoute from "./components/utils/ProtectedRoute";
import SearchContext from "./customHook/TokenContext"
import "./App.css";
import Post from "./components/Post/Post";
import Search from "./components/Search/Search";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const searchResultsId = useContext(SearchContext);

  useEffect(() => {
    console.log(user?.id)
    setToken(localStorage.getItem("token"));
  }, [token]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/perfil/:id" element={<Perfil userProp={user} />} />
          <Route path="/seguidos" element={<Followings />} />
          <Route path="/seguidores" element={<Followers />} />
          <Route path="/upload" element={<Upload userId={searchResultsId} />} />
          <Route path="/post" element={<Post />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
