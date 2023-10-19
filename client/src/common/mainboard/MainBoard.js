import "./MainBoard.css";
import http from "../../pages/export";
import React, { useState, useEffect, useRef } from "react";
import Button from "../button/Button";
import List from "../list/List";

function MainBoard({ selectedBoard }) {
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const escListener = useRef(null);

  useEffect(() => {
    http.get(`/getlists/?id=${selectedBoard}`).then((response) => {
      setLists(response.data);
    });
    console.log(lists);
  }, [selectedBoard]);

  useEffect(() => {
    // Adiciona um ouvinte de teclado para a tecla "Esc" quando o popup estiver aberto
    if (showPopup) {
      escListener.current = (e) => {
        if (e.key === "Escape") {
          setShowPopup(false);
        }
      };
      window.addEventListener("keydown", escListener.current);
    } else {
      // Remove o ouvinte de teclado quando o popup estiver fechado
      if (escListener.current) {
        window.removeEventListener("keydown", escListener.current);
      }
    }

    return () => {
      // Remover o ouvinte ao desmontar o componente
      if (escListener.current) {
        window.removeEventListener("keydown", escListener.current);
      }
    };
  }, [showPopup]);

  async function handleCreateList() {
    try {
      console.log("Inserindo nova Lista:", newListName);

      // Envie a solicitação POST para criar a nova placa
      const response = await http.post("/newlist", {
        name: newListName,
        id: selectedBoard,
      });

      // Verifique se a solicitação foi bem-sucedida antes de atualizar o estado
      if (response.status === 200) {
        // Atualize o estado com a nova placa adicionada
        setLists([
          ...lists,
          { id: response.data.insertId, name: newListName, color: null },
        ]);

        // Limpa o input e fecha o popup
        setNewListName("");
        setShowPopup(false);
      } else {
        console.error("Erro ao criar o quadrto");
      }
    } catch (error) {
      console.error("Erro ao criar o quadro:", error);
    }
  }

  return (
    <div className="MainBoard">
      {lists.map((list) => (
        <List 
          idList={list.id} 
          nameList={list.name} 
          colorList={list.color} 
        />
      ))}
      {!showPopup && (
        <div className="NewListBtn">
          <Button
            title="nova lista"
            icon="fi fi-rr-plus-small"
            onClick={() => setShowPopup(true)}
          />
        </div>
      )}
      {showPopup && (
        <div className="NewList">
          <input
            type="text"
            placeholder="nome do novo quadro..."
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
          />
          <i class="fi fi-rr-add" onClick={handleCreateList}></i>
        </div>
      )}
    </div>
  );
}

export default MainBoard;
