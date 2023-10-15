import React, { useState, useEffect } from "react";
import "./Filters.css";

function Filters({idUser}) {

  const [colors, setcolors] = useState(['#ffffff', "#000000"]);
  const [labels, setlabels] = useState(['Importantes', 'Urgentes', 'segundo plano']);

  return (
    <div className="Filters">
      <h3>Filtros</h3>

      <div className="Colors">
        
      <i class="fi fi-rr-palette"></i>
        <p>a cor é:</p>

        <select>
          <option>todas as cores</option>
          {colors.map((color, index) => (
            <option key={index} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>

      <div className="Labels">
        <i class="fi fi-rr-label"></i>
        <p>o rótulo é:</p>

        <select>
          <option>todos os rótulos</option>
          {labels.map((label, index) => (
            <option key={index} value={label}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Filters;
