import React, { useState } from "react";
import Button from "../button/Button";
import "./Filters.css";

function Filters({ setFilterColor, setFilterCheck }) {
  const [selectedColor, setSelectedColor] = useState("todas");
  const [selectedLabel, setSelectedLabel] = useState("qualquer");

  const colors = ['#ffffff', "#000000"];

  function handleColorChange(event) {
    setSelectedColor(event.target.value);
  }

  function handleLabelChange(event) {
    setSelectedLabel(event.target.value);
  }

  function handleFilterApply() {
    setFilterColor(selectedColor);
    setFilterCheck(selectedLabel);
  }

  return (
    <div className="Filters">
      <h3>Filtros</h3>

      <div className="Colors">
        <i className="fi fi-rr-palette"></i>
        <p>a cor é:</p>

        <select onChange={handleColorChange}>
          <option value="todas">todas</option>
          {colors.map((color, index) => (
            <option key={index} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>

      <div className="Labels">
        <i className="fi fi-rr-label"></i>
        <p>situação:</p>

        <select onChange={handleLabelChange}>
          <option value="qualquer">qualquer</option>
          <option value="completas">completas</option>
          <option value="incompletas">incompleta</option>
        </select>
      </div>

      <Button
        title="Aplicar filtro"
        icon="fi fi-rr-filter"
        onClick={()=>handleFilterApply()}
      />
    </div>
  );
}

export default Filters;
