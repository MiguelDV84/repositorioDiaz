import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../utils/Header/Header";
import FooterMenu from "./../menu/Menu";
import axios from "axios";
import ProfileItem from "../utils/ProfileItem/ProfileItem";
import SearchContext from "./../../customHook/TokenContext";
import "./Search.css";
import ButtonPrimary from "../buttons/ButtonPrimary";

export default function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState();
  const [token] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const API = "http://localhost:3001/api";
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${API}/user/users/${searchValue}`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(response.data.user);
      setSearchResults(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleProfileClick = (profileId) => {
    navigate(`/perfil/${profileId}`);
  };

const handleFollow = async () => {
  const userIdFollow = searchResults?._id;
  const userId = user?.id;
  try {
    const response = await axios.post(
      `${API}/follow/save`,
      { followed: userIdFollow, userId },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};


  return (
    <SearchContext.Provider value={searchResults?._id}>
        <Header text={"Buscador"} back={true} />
        <input
          name="develop"
          placeholder="Busca a un desarrollador..."
          color={"primary"}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyUp={handleKeyPress}
        />
        <button onClick={handleSearch}>Buscar</button>
        {searchResults && (
          <div className="profiles__container">
            <div className="profile__item">
              <Link
                to={`/perfil/${searchResults?._id}`}
                onClick={() =>
                  localStorage.setItem("userId", searchResults?._id)
                }
              >
                <ProfileItem
                  className={"profile__image"}
                  image={searchResults?.image}
                  nick={searchResults?.nick}
                  onClick={() => handleProfileClick(searchResults?._id)}
                />
                <ButtonPrimary onClick={handleFollow} text={"Seguir"} />
              </Link>
            </div>
          </div>
        )}

        <FooterMenu />
    </SearchContext.Provider>
  );
}
