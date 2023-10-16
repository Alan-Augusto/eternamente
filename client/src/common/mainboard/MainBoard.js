import "./MainBoard.css";
import http from "../../pages/export";
import React, { useState, useEffect } from "react";
import Button from "../button/Button";
import List from "../list/List";

function MainBoard({ selectedBoard }) {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    http.get(`/getlists/?id=${selectedBoard}`).then((response) => {
      setLists(response.data);
    });
    console.log(lists);
  }, [selectedBoard]);

  return (
    <div className="MainBoard">
      {lists.map((list) => (
        <List idList={list.id} nameList={list.name} colorList={list.color} />
      ))}
      <Button title="nova lista" icon="fi fi-rr-plus-small" />
    </div>
  );
}

export default MainBoard;
