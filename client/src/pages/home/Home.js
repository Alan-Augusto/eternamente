import React, { useState, useEffect } from "react";
import http from "../export";
import "./Home.css";
import Boards from "../../common/boards/Boards";
import Filters from "../../common/filters/Filters";
import MainBoard from "../../common/mainboard/MainBoard";
import Header from "../../common/header/Header";

function Home({ idUser }) {
  const [selectedBoard, setSelectedBoard] = useState("");
  const [filterColor, setFilterColor] = useState("todas");
  const [filterCheck, setFilterCheck] = useState("qualquer");

  return (
    <div className="Home">
      <div className="Header">
        <Header id={idUser} />
      </div>
      <div className="Body">
        <div className="SideBar">
          <Filters
            idUser={idUser}
            setFilterColor={setFilterColor}
            setFilterCheck={setFilterCheck}
          />
          <Boards
            selectedBoard={selectedBoard}
            setSelectedBoard={setSelectedBoard}
            idUser={idUser}
          />
        </div>
        <div className="Main">
          {/* CONJUNTO DE LISTAS*/}
          <MainBoard
            selectedBoard={selectedBoard}
            filterColor={filterColor}
            filterCheck={filterCheck}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
