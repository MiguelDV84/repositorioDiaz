import React, { useContext, useEffect, useState } from "react";
import { TokenProvider, TokenContext } from "./customHook/TokenContext";
import Login from "./components/login/login";
import "./App.css";
import Feed from "./components/feed/Feed";
import useLocalStorage from "./customHook/useLocalStorage";



function App() {

  const [ token, setToken] = useLocalStorage("token", null);

  useEffect(() => {
    console.log({token})
  }, [token])
    

  return (
    <div className="App">
      {!token ? (
        <Login />
      ) : (
        <>
          <h1>Estás logueadossso</h1>
          <Feed />
        </>
      )}
    </div>
  );
}

function AppWrapper() {
  return (
    <TokenProvider>
      <App />
    </TokenProvider>
  );
}

export default AppWrapper;
