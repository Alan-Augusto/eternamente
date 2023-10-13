import {
  Route,
  Routes,
  Navigate,
  BrowserRouter as Router,
} from "react-router-dom";
import Home from "../pages/home/Home";
import Signin from "../pages/signin/Signin";
import { useEffect } from "react";
import Signup from "../pages/signup/Signup";

export const RouterApp = ({ isAuthenticated, handleLoginSuccess }) => {
  useEffect(() => {
    console.log("Atualizou o Routes");
  }, [isAuthenticated]);

  console.log("Router ->", isAuthenticated);
  return (
    <Router>
      <Routes>
        {isAuthenticated ? (
          <Route path="/" element={<Signin />} />
        ) : (
          <Route
            path="/"
            element={<Signin handleLoginSuccess={handleLoginSuccess} />}
          />
        )}
        <Route path="/signin" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};
