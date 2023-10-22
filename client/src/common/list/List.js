import "./List.css";
import React, { useState, useEffect } from "react";
import http from "../../pages/export";
import Task from "../task/Task";
import Button from "../button/Button";
import Input from "../input/Input";

function List({ idList, nameList, colorList, deletList, handleEditList }) {
  const [tasks, setTasks] = useState([]);
  const [newListName, setNewListName] = useState(nameList);
  const [newColorList, setNewColorList] = useState(colorList);
  const [editPopUp, setEditPopUp] = useState(false);

  const [newTaskPopUp, setNewTaskPopUp] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskDate, setNewTaskDate] = useState("");
  const [newTaskColor, setNewTaskColor] = useState("");


  async function handleCreateTask(
    title,
    description,
    date,
    color,
    completed,
    help,
    helptext
  ) {
    try {
      console.log("Inserindo nova Tarefa:", newListName);

      const response = await http.post("/newtask", {
        title: title,
        description: description,
        date: date,
        color: color,
        completed: completed,
        help: help,
        helptext: helptext,
        idList: idList,
      });
    } catch (error) {
      console.error("Erro ao criar o quadro:", error);
    }
  }

  const style = {
    background: colorList !== null ? colorList : "",
  };

  useEffect(() => {
    http.get(`/getTasks/?id=${idList}`).then((response) => {
      setTasks(response.data);
    });
  }, [idList]);

  return (
    <div className="List">
      {colorList && <div className="SideColor" style={style}></div>}

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
            color={task.color}
            completed={task.completed}
          />
        ))}
        <Button 
          title="nova tarefa" 
          onClick={() => setNewTaskPopUp(true)}
        />
      </div>
      {editPopUp && (
        <div className="backgroundPopUp">
          <div className="FormPopUp">
            <h3>Edite sua lista</h3>
            <Input
              title="Nome da lista"
              type="text"
              icon="fi fi-rr-id-card-clip-alt"
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
            <div className="PopUpButtons">
              <Button
                onClick={() => setEditPopUp(false)}
                title="Cancelar"
                icon="fi fi-rr-cross-small"
              />
              <Button
                onClick={() =>
                  handleEditList(idList, newListName, newColorList, setEditPopUp)
                }
                title="Aplicar"
                icon="fi fi-rr-check"
              />
            </div>
          </div>
        </div>
      )}
      {newTaskPopUp && (
        <div className="backgroundPopUp">
          <div className="FormPopUp">
            <h3>Nova Tarefa:</h3>
            <Input
              title="Título"
              placeholder="Digite o título..."
              type="text"
              icon="fi fi-rr-id-card-clip-alt"
              value={newTaskTitle}
              onChange={(e)=>setNewTaskTitle(e.target.value)}
            />
            <Input
              title="Descrição"
              placeholder="Informações importantes..."
              type="text"
              icon="fi fi-rr-poll-h"
              value={newTaskDescription}
              onChange={(e)=>setNewTaskDescription(e.target.value)}
            />
            <Input
              title="Data"
              type="date"
              icon="fi fi-rr-calendar"
              value={newTaskDate}
              onChange={(e)=>setNewTaskDate(e.target.value)}
            />
            <Input 
              title="Cor da Tarefa" 
              type="color" 
              icon="fi fi-rr-palette"
              value={newTaskColor}
              onChange={setNewTaskColor}
            />
            <div className="PopUpButtons">
              <Button
                onClick={() => setNewTaskPopUp(false)}
                title="Cancelar"
                icon="fi fi-rr-cross-small"
              />
              <Button
                onClick={() => setNewTaskPopUp(false)}
                title="Aplicar"
                icon="fi fi-rr-check"
              />
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default List;
