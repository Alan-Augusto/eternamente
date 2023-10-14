import React, { useState, useEffect } from "react";
import { RouterApp } from "./routes/index";
import "./App.css"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [idUser, setIdUser] = useState("");

  const handleLoginSuccess = (id) => {
    setIsAuthenticated(true);
    setIdUser(id)
  };

  useEffect(() => {
    console.log("Está autenticado? -> ", isAuthenticated);
    console.log("id = ", idUser);
  }, [isAuthenticated]); // Adicione isAuthenticated como dependência

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="App">
      <RouterApp
        isAuthenticated={isAuthenticated}
        handleLoginSuccess={handleLoginSuccess}
        idUser={idUser}
      />
    </div>
  );
}

export default App;
