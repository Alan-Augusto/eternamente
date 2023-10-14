import React, { useState, useEffect } from "react";
import http from "../export";
import "./Home.css";
import SideBar from "../../common/sideBar/SideBar";

function Home({ idUser }) {
  const [selectedBoard, setSelectedBoard] = useState("");
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    http.get(`/home/?id=${idUser}`).then((response) => {
      setBoards(response.data);
    });
  }, [idUser]);

  return (
    <div className="Home">
      <SideBar
        boards={boards}
        selectedBoard={selectedBoard}
      />
    </div>
  );
}

export default Home;
