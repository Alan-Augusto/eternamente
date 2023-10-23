import "./Boards.css";
import React, { useState, useEffect, useRef } from "react";
import Button from "../button/Button";
import http from "../../pages/export";

function Boards({ selectedBoard, setSelectedBoard, idUser }) {
  const [showPopup, setShowPopup] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");
  const [boards, setBoards] = useState([]);

  const escListener = useRef(null);

  async function handleDeletBoard(id) {
    try {
      // Envie a solicitação POST para excluir a placa
      await http.post("/detetboard", {
        id: id,
      });

      // Atualize o estado removendo a placa excluída
      setBoards(boards.filter((board) => board.id !== id));
    } catch (error) {
      console.error("Erro ao excluir a placa:", error);
    }
  }

  useEffect(() => {
    http.get(`/getboards/?id=${idUser}`).then((response) => {
      setBoards(response.data);

      if (response.data.length > 0) {
        setSelectedBoard(response.data[0].id);
      }
    });
  }, [idUser, showPopup]);

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

  async function handleCreateBoard() {
    try {
      console.log("Inserindo nova Board:", newBoardName);

      // Envie a solicitação POST para criar a nova placa
      const response = await http.post("/newboard", {
        name: newBoardName,
        id: idUser,
      });

      // Verifique se a solicitação foi bem-sucedida antes de atualizar o estado
      if (response.status === 200) {
        // Atualize o estado com a nova placa adicionada
        setBoards([...boards, response.data]);

        // Limpa o input e fecha o popup
        setNewBoardName("");
        setShowPopup(false);
      } else {
        console.error("Erro ao criar o quadrto");
      }
    } catch (error) {
      console.error("Erro ao criar o quadro:", error);
    }
  }

  return (
    <div className="Boards">
      <h3>Quadros</h3>
      {boards.map((board) => (
        <div className="BoardItem">
          <div className="ItemButton">
            <Button
              key={board.id}
              title={board.title}
              color={selectedBoard === board.id ? "#ffff" : "#ffff"}
              colorText={selectedBoard === board.id ? "blue" : "black"}
              shadow={selectedBoard === board.id ? "0px 0px 8px #00F0FF" : ""}
              onClick={() => setSelectedBoard(board.id)}
            />
          </div>
          <i
            class="fi fi-rr-trash"
            onClick={() => handleDeletBoard(board.id)}
          ></i>
        </div>
      ))}
      {!showPopup && (
        <Button
          title="novo quadro"
          icon="fi fi-rr-plus-small"
          onClick={() => setShowPopup(true)}
        />
      )}

      {showPopup && (
        <div className="NewBoard">
          <input
            type="text"
            placeholder="nome do novo quadro..."
            value={newBoardName}
            onChange={(e) => setNewBoardName(e.target.value)}
          />
          <i class="fi fi-rr-add" onClick={handleCreateBoard}></i>
        </div>
      )}
    </div>
  );
}

export default Boards;
