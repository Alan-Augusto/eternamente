import "./Boards.css";
import React, { useState, useEffect } from "react";
import Button from "../button/Button";

function Boards({boards, selectedBoard, onClick}) {

    return (
    <div className="Boards">
        <h3>Quadros</h3>
        {boards.map((board) => (
          <Button
            key={board.id}
            title={board.title}
            color={selectedBoard === board.id ? "#ffff" : "#ffff"}
            colorText={selectedBoard === board.id ? "blue" : "black"}
            shadow={selectedBoard === board.id ? "0px 0px 8px #00F0FF" : ""}
            onClick={() => onClick(board.id)}
          />
        ))}
        <Button
            title="novo quadro"
            icon="fi fi-rr-plus-small"
          />
    </div>
  );
}

export default Boards;
