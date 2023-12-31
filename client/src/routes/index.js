import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Signin from "../pages/signin/Signin";
import { useEffect } from "react";
import Signup from "../pages/signup/Signup";
import Home from "../pages/home/Home";

export const RouterApp = ({ isAuthenticated, handleLoginSuccess, idUser }) => {
  useEffect(() => {
    console.log("Atualizou o Routes | ID ->", idUser);
  }, [isAuthenticated, idUser]);
  
  return (
    <Router>
      <Routes>
        {isAuthenticated ? (
          <Route path="/" element={<Home idUser={idUser} />} />
        ) : (
          <Route
            path="/"
            element={<Signin handleLoginSuccess={handleLoginSuccess} />}
          />
        )}
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};
