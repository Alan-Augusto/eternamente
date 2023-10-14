import React, { useState, useEffect } from "react";
import http from "../export";
import "./Home.css";
import Boards from "../../common/boards/Boards";
import Filters from "../../common/filters/FIlters";

function Home({ idUser }) {
  const [selectedBoard, setSelectedBoard] = useState("");
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    http.get(`/home/?id=${idUser}`).then((response) => {
      setBoards(response.data);

      if (response.data.length > 0) {
        setSelectedBoard(response.data[0].id);
      }
    });
  }, [idUser]);

  return (
    <div className="Home">
      <div className="Header"></div>
      <div className="Main">
        <div className="SideBar">
          <Filters/>
          <Boards
            boards={boards}
            selectedBoard={selectedBoard}
            onClick={setSelectedBoard}
          />
        </div>

        <Boards
          boards={boards}
          selectedBoard={selectedBoard}
          onClick={setSelectedBoard}
        />
      </div>
    </div>
  );
}

export default Home;
