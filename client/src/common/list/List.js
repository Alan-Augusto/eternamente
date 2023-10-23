import "./List.css";
import React, { useState, useEffect } from "react";
import http from "../../pages/export";
import Task from "../task/Task";
import Button from "../button/Button";
import Input from "../input/Input";

function List({ idList, nameList, colorList, deletList, handleEditList, filterColor, filterCheck }) {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  const [newListName, setNewListName] = useState(nameList);
  const [newColorList, setNewColorList] = useState(colorList);
  const [editPopUp, setEditPopUp] = useState(false);

  const [creatingTask, setCreatingTask] = useState(false);
  const [editing, setEditingTask] = useState(false);

  const [newTaskPopUp, setNewTaskPopUp] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskDate, setNewTaskDate] = useState("");
  const [newTaskColor, setNewTaskColor] = useState("");

  async function handleCreateTask() {
    try {
      setCreatingTask(true);
      console.log(
        "Inserindo nova Tarefa:",
        newTaskTitle,
        newTaskDescription,
        newTaskDate,
        newTaskColor
      );

      const response = await http.post("/newtask", {
        title: newTaskTitle,
        description: newTaskDescription,
        date: newTaskDate,
        color: newTaskColor,
        completed: false,
        idList: idList,
      });

      // Após a criação da tarefa, atualize o estado tasks
      setTasks([...tasks, response.data]); // Adicione a nova tarefa ao estado tasks

      setCreatingTask(false);
      // Feche o pop-up de nova tarefa
      
      setNewTaskPopUp(false);
      setNewTaskTitle("");
      setNewTaskDescription("");
      setNewTaskDate("");
      setNewTaskColor("");
      
    } catch (error) {
      setCreatingTask(false);
      console.error("Erro ao criar o quadro:", error);
    }
  }

  async function handleDeletTask(id) {
    try {
      // Envie a solicitação POST para excluir a placa
      await http.post("/delettask", {
        id: id,
      });

      // Atualize o estado removendo a placa excluída
      setTasks(tasks.filter((Task) => Task.id !== id));
    } catch (error) {
      console.error("Erro ao excluir a placa:", error);
    }
  }

  async function handleEditTask(id, completed) {
    try {
      setEditingTask(true);
      console.log(
        "EditandoTarefa:",
        newTaskTitle,
        newTaskDescription,
        newTaskDate,
        newTaskColor
      );

      const response = await http.post("/edittask", {
        title: newTaskTitle,
        description: newTaskDescription,
        date: newTaskDate,
        color: newTaskColor,
        completed: completed,
        idList: id,
      });

      // Após a criação da tarefa, atualize o estado tasks
      setTasks([...tasks, response.data]); // Adicione a nova tarefa ao estado tasks

      setEditingTask(false);
      // Feche o pop-up de nova tarefa
      
      setNewTaskPopUp(false);
      setNewTaskTitle("");
      setNewTaskDescription("");
      setNewTaskDate("");
      setNewTaskColor("");
      
    } catch (error) {
      setEditingTask(false);
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
  }, [idList, creatingTask, editing, filterCheck, filterColor]);

  useEffect(() => {
    // Filtre as tarefas com base no filtro de cor e de conclusão
    const filtered = tasks.filter((task) => {
      const colorMatch = filterColor === "todas" || task.color === filterColor;
      const checkMatch = filterCheck === "qualquer" || (filterCheck === "completas" && task.completed) || (filterCheck === "incompletas" && !task.completed);
      return colorMatch && checkMatch;
    });
    setFilteredTasks(filtered);
  }, [filterColor, filterCheck, tasks]);

  return (
    <div className="List">
      {colorList && <div className="SideColor" style={style}></div>}

      <div className="TaskList">
        <div className="TitleList">
          <h3>{nameList}</h3>
          <i class="fi fi-rr-pencil" onClick={() => setEditPopUp(true)}></i>
          <i class="fi fi-rr-cross-small" onClick={deletList}></i>
        </div>
        {filteredTasks.map((task) => (
          <Task
            id={task.id}
            title={task.title}
            description={task.description}
            date={task.date}
            color={task.color}
            completed={task.completed}
            deletTask={() => handleDeletTask(task.id)}
            key={task.id} // Adicione uma chave única para cada tarefa
          />
        ))}
        <Button 
          title="nova tarefa" 
          onClick={() => setNewTaskPopUp(true)}
          color="rgba(80, 80, 100, 0.25) "
          icon="fi fi-rr-plus-small"
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
                  handleEditList(
                    idList,
                    newListName,
                    newColorList,
                    setEditPopUp
                  )
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
                onClick={() => setNewTaskPopUp(false)}
                title="Cancelar"
                icon="fi fi-rr-cross-small"
              />
              <Button
                onClick={() => handleCreateTask()}
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
