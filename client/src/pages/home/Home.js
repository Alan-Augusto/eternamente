import React, { useState, useEffect } from "react";
import http from "../export";
import "./Home.css";

function Home({ idUser }) {
  const [userInfos, setUserInfos] = useState([]);

  useEffect(() => {
    http.get(`/home/?id=${idUser}`).then((response) => {
      setUserInfos(response.data[0]);
    });
    console.log("Atualizou Home", idUser);
  }, [idUser]);

  return (
    <div className="Home">
      <p>SEJA BEM VINDO, {userInfos.name} !</p>
      <p>Feliz, aniversário em {userInfos.birthday}</p>
    </div>
  );
}

export default Home;
