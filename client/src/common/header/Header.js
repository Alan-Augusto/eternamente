import "./Header.css";
import React, { useState, useEffect } from "react";
import http from "../../pages/export";

function Header({ id }) {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    http.get(`/getuser/?id=${id}`).then((response) => {
      setUserName(response.data[0].name);
    });
  }, [id]);

  console.log("IDUSER:", id)

  return (
    <div className="Header">
      <img src="./assets/LogoBlack.png" alt="logomarca" />
      <div className="HeaderTitle">
        <p>olá, {userName}</p>
      </div>
    </div>
  );
}

export default Header;
