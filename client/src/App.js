import React, { useState, useEffect } from "react";
import { RouterApp } from "./routes/index";
import "./App.css"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  useEffect(() => {
    console.log("Está autenticado? -> ", isAuthenticated);
  }, [isAuthenticated]); // Adicione isAuthenticated como dependência

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="App">
      <RouterApp
        isAuthenticated={isAuthenticated}
        handleLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

export default App;
