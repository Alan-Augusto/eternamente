import React, { useState, useEffect } from "react";
import http from "../export";
import "./Home.css";
import Boards from "../../common/boards/Boards";
import Filters from "../../common/filters/Filters";

function Home({ idUser }) {
  const [selectedBoard, setSelectedBoard] = useState("");

  return (
    <div className="Home">
      <div className="Header"></div>
      <div className="Main">
        <div className="SideBar">
          <Filters
            idUser={idUser}
          />
          <Boards
            selectedBoard={selectedBoard}
            setSelectedBoard={setSelectedBoard}
            idUser={idUser}
          />
        </div>

        <Boards
          selectedBoard={selectedBoard}
          setSelectedBoard={setSelectedBoard}
        />
      </div>
    </div>
  );
}

export default Home;
