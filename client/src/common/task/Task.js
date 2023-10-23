import "./Task.css";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import http from "../../pages/export";

function Task({id, title, description, date, color, completed, deletTask}) {

  const formattedDate = date instanceof Date && !isNaN(date)
    ? date.toLocaleDateString()
    : '';

  const [checked, setChecked] = useState(completed);

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

  useEffect(() => {
    console.log(checked);
  }, [checked]);

  return (
    <div className="Task">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => handleCheckTask()}
      />

      <div className="TaskInfos">
        <h3>{title}</h3>
        <p>{description}</p>
        <p>{formattedDate}</p>
      </div>

      <i class="fi fi-rr-trash" onClick={deletTask}></i>
    </div>
  );
}

export default Task;
