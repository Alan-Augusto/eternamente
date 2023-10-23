import "./Task.css";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import Input from "../input/Input";
import Button from "../button/Button";
import http from "../../pages/export";

function Task({
  id,
  title,
  description,
  date,
  color,
  completed,
  deletTask,
  editTask,
}) {
  const formattedDate = date
    ? new Date(date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "";

  const [checked, setChecked] = useState(completed);
  const [editTaskPopUp, setEditTaskPopUp] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState(title);
  const [newTaskDescription, setNewTaskDescription] = useState(description);
  const [newTaskDate, setNewTaskDate] = useState(date);
  const [newTaskColor, setNewTaskColor] = useState(color);

  const style = {
    background: color !== null ? color : "",
  };

  async function handleCheckTask() {
    try {
      console.log("Checkando task:", title);

      const response = await http.post("/checktask", {
        id: id,
        check: !checked,
      });

      // Se a solicitação for bem-sucedida, atualize o estado
      setChecked(!checked);
    } catch (error) {
      console.error("Erro ao setar task:", error);
    }
  }

  return (
    <div className="TaskContainer">
      <div className="Task">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => handleCheckTask()}
        />

        <div className="TaskInfos" onClick={() => setEditTaskPopUp(true)}>
          <h3>{title}</h3>
          <p>{description}</p>
          <p>{formattedDate}</p>
        </div>

        <i class="fi fi-rr-trash" onClick={() => deletTask()}></i>
      </div>
      <div className="TaskColor" style={style} />
      {editTaskPopUp && (
        <div className="backgroundPopUp">
          <div className="FormPopUp">
            <h3>Editar tarefa:</h3>
            <Input
              title="Título"
              placeholder="Digite o título..."
              type="text"
              icon="fi fi-rr-id-card-clip-alt"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
            />
            <Input
              title="Descrição"
              placeholder="Informações importantes..."
              type="text"
              icon="fi fi-rr-poll-h"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
            />
            <Input
              title="Data"
              type="date"
              icon="fi fi-rr-calendar"
              value={newTaskDate}
              onChange={(e) => setNewTaskDate(e.target.value)}
            />
            <Input
              title="Cor da Tarefa"
              type="color"
              icon="fi fi-rr-palette"
              value={newTaskColor}
              onChange={(e) => setNewTaskColor(e.target.value)}
            />
            <div className="PopUpButtons">
              <Button
                onClick={() => setEditTaskPopUp(false)}
                title="Cancelar"
                icon="fi fi-rr-cross-small"
              />
              <Button
                onClick={(e) =>
                  editTask(
                    id,
                    newTaskTitle,
                    newTaskDescription,
                    newTaskDate,
                    newTaskColor,
                    completed,
                    setEditTaskPopUp
                  )
                }
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

export default Task;
