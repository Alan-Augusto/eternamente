import "./MainBoard.css";
import http from "../../pages/export";
import React, { useState, useEffect, useRef } from "react";
import Button from "../button/Button";
import List from "../list/List";

function MainBoard({ selectedBoard, filterColor, filterCheck }) {
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

  async function handleDeletList(id) {
    try {
      // Envie a solicitação POST para excluir a placa
      await http.post("/deletlist", {
        id: id,
      });

      // Atualize o estado removendo a placa excluída
      setLists(lists.filter((lists) => lists.id !== id));
    } catch (error) {
      console.error("Erro ao excluir a placa:", error);
    }
  }

  async function handleEditList(
    idList,
    newListName,
    newColorList,
    setEditPopUp
  ) {
    try {
      console.log("Editando lista:", newListName);

      // Envie a solicitação POST para editar a lista
      const response = await http.post("/editlist", {
        name: newListName,
        color: newColorList,
        id: idList,
      });

      // Verifique se a solicitação foi bem-sucedida antes de atualizar o estado
      if (response.status === 200) {
        // Atualize o estado com a lista editada
        setLists((prevLists) => {
          return prevLists.map((list) => {
            if (list.id === idList) {
              return { ...list, name: newListName, color: newColorList };
            } else {
              return list;
            }
          });
        });

        setEditPopUp(false);
        setNewListName("");
        newColorList("");
      } else {
        console.error("Erro ao editar lista");
      }
    } catch (error) {
      console.error("Erro ao editar lista:", error);
    }
  }

  return (
    <div className="MainBoard">
      {lists.map((list) => (
        <List
          idList={list.id}
          nameList={list.name}
          colorList={list.color}
          deletList={() => handleDeletList(list.id)}
          handleEditList={handleEditList}
          filterColor={filterColor}
          filterCheck={filterCheck}

        />
      ))}
      {!showPopup && (
        <div className="NewListBtn">
          <Button
            title="nova lista"
            icon="fi fi-rr-plus-small"
            onClick={() => setShowPopup(true)}
            color="#ffffff6a"
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
