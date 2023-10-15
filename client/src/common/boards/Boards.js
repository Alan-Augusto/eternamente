import "./Boards.css";
import React, { useState, useEffect } from "react";
import Button from "../button/Button";
import http from "../../pages/export";

function Boards({ selectedBoard, setSelectedBoard, idUser }) {
  const [showPopup, setShowPopup] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    http.get(`/getboards/?id=${idUser}`).then((response) => {
      setBoards(response.data);

      if (response.data.length > 0) {
        setSelectedBoard(response.data[0].id);
      }
    });
  }, [idUser, showPopup]);

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
        console.error("Erro ao criar a placa");
      }
    } catch (error) {
      console.error("Erro ao criar a placa:", error);
    }
  }

  return (
    <div className="Boards">
      <h3>Quadros</h3>
      {boards.map((board) => (
        <Button
          key={board.id}
          title={board.title}
          color={selectedBoard === board.id ? "#ffff" : "#ffff"}
          colorText={selectedBoard === board.id ? "blue" : "black"}
          shadow={selectedBoard === board.id ? "0px 0px 8px #00F0FF" : ""}
          onClick={() => setSelectedBoard(board.id)}
        />
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
