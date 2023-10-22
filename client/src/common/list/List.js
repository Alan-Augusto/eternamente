import "./List.css";
import React, { useState, useEffect } from "react";
import http from "../../pages/export";
import Task from "../task/Task";
import Button from "../button/Button";
import Input from "../input/Input";

function List({ idList, nameList, colorList,  deletList, handleEditList}) {
  const [tasks, setTasks] = useState([]);
  const [newListName, setNewListName] = useState(nameList);
  const [newColorList, setNewColorList] = useState(colorList);
  const [editPopUp, setEditPopUp] = useState(false);

  const style = {
    background: colorList !== null ? colorList : "",
  };

  useEffect(() => {
    http.get(`/getTasks/?id=${idList}`).then((response) => {
      setTasks(response.data);
    });
  }, [idList]);


  return (
    <div className="List" >
      {colorList && 
      <div className="SideColor" style={style}>
      </div>}

      <div className="TaskList">
        <div className="TitleList">
          <h3>{nameList}</h3>
          <i class="fi fi-rr-pencil" onClick={() => setEditPopUp(true)}></i>
          <i class="fi fi-rr-cross-small" onClick={deletList}></i>
        </div>
        {tasks.map((task) => (
            <Task
              title={task.title}
              description={task.description}
              date={task.date}
            />
        ))}
        <Button
          title='nova tarefa'
        />
      </div>
      {editPopUp&&
      <div className="backgroundPopUp">
        <div className="FormPopUp">
          <h3>Edite sua lista</h3>
          <Input
            title="Nome da lista"
            type="text"
            icon="fi fi-rr-list"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
          />
          <Input
            title="Cor da Lista"
            type="color"
            icon="fi fi-rr-palette"
            value={newColorList}
            onChange={(e) => setNewColorList(e.target.value)}
          />
          <Button
            onClick={() => handleEditList(idList, newListName, newColorList, setEditPopUp)}
            title="Aplicar"
            icon="fi fi-rr-check"
          />
        </div>
      </div>

      }
    </div>
  );
}

export default List;
