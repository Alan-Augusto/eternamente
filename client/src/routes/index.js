import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Signin from "../pages/signin/Signin";
import { useEffect } from "react";
import Signup from "../pages/signup/Signup";
import Home from "../pages/home/Home";

export const RouterApp = ({ isAuthenticated, handleLoginSuccess }) => {
  useEffect(() => {
    console.log("Atualizou o Routes");
  }, [isAuthenticated]);

  console.log("Router ->", isAuthenticated);
  return (
    <Router>
      <Routes>
        {isAuthenticated ? (
          <Route path="/" element={<Home />} />
        ) : (
          <Route
            path="/"
            element={<Signin handleLoginSuccess={handleLoginSuccess} />}
          />
        )}
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};
