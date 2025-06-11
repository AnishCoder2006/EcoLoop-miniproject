import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Login } from "./login.jsx";
import Signup from "./signup.jsx";
import Seller from "./seller.jsx";
import Refurbisher1 from "./refurbisher1.jsx";
import { Refurbishers } from "./refurbisher2.jsx";// ✅ Corrected import
import { Buyer1 } from "./buyer1.jsx";
import RemainPage from "./remainpage.jsx";
import "./App.css";
import "./pro.css";
import "./refurbisher1.css";
import "./remainpage.css";
import "./signup.css";
import "./buyer1.css";
import "./refurbisher2.css"

function App() {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    token: null,
  });

  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuth({
      isAuthenticated: false,
      user: null,
      token: null,
    });
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      if (token && user && !auth.isAuthenticated) {
        try {
          const response = await fetch("http://localhost:3001/api/verify-token", {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.ok) {
            setAuth({
              isAuthenticated: true,
              user: JSON.parse(user),
              token,
            });

            if (window.location.pathname === "/") {
              navigate(`/${JSON.parse(user).role}`);
            }
          } else {
            handleLogout();
          }
        } catch (error) {
          console.error("Token verification failed:", error);
          handleLogout();
        }
      }
    };

    verifyAuth();
  }, [navigate, handleLogout, auth.isAuthenticated]);

  const handleAuthSuccess = (token, user, fromSignup = false) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setAuth({
      isAuthenticated: true,
      user,
      token,
    });

    if (fromSignup) {
      navigate("/login"); // ✅ Redirect to login after signup
    } else {
      if (user.role === "refurbisher") {
        navigate("/refurbisher1");
      } else {
        navigate(`/${user.role}`);
      }
    }
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            auth.isAuthenticated ? (
              <Navigate to={`/${auth.user?.role}`} replace />
            ) : (
              <Navigate to="/signup" replace />
            )
          }
        />
        <Route path="/signup" element={<Signup onAuthSuccess={(token, user) => handleAuthSuccess(token, user, true)} />} />
        <Route path="/login" element={!auth.isAuthenticated ? <Login onAuthSuccess={handleAuthSuccess} /> : <Navigate to={`/${auth.user?.role}`} replace />} />

        <Route path="/seller" element={auth.isAuthenticated && auth.user.role === "seller" ? <Seller onLogout={handleLogout} /> : <Navigate to="/login" replace />} />
      <Route path="/refurbisher" element={auth.isAuthenticated && auth.user.role === "refurbisher" ? <Refurbisher1 onLogout={handleLogout} /> : <Navigate to="/login" replace />} />
        <Route path="/buyer" element={auth.isAuthenticated && auth.user.role === "buyer" ? <Buyer1 onLogout={handleLogout} /> : <Navigate to="/login" replace />} />

        <Route path="/remainpage" element={<RemainPage />} />
        <Route path="/refurbisher2" element={<Refurbishers />} />
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </div>
  );
}

export default App;