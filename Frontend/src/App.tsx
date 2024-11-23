import { Box } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState, useEffect, FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import FrontPage from "./Pages/Frontpage";
import Header from "./Pages/Header";
import InformationScreen from "./Pages/Information";
import LoginScreen from "./Pages/LoginPage";
import Navigointi from "./Pages/Navigate";
import CreateAccountScreen from "./Pages/CreateAccount";
import Profile from "./Pages/Profile";

const App: FC = () => {
  const [currentUser, setCurrentUser] = useState<{ username: string; role: number } | null>(null);

  // Load user from localStorage on app load
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  const setUser = (username: string, role: number) => {
    setCurrentUser({ username, role });
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <div>
      <BrowserRouter>
        {/* Pass props to Header */}
        <Header currentUser={currentUser} handleLogout={handleLogout} />
        <Navigointi />

        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/login" element={<LoginScreen setUser={setUser} />} />
          <Route path="/information" element={<InformationScreen />} />
          <Route path="/createprofile" element={<CreateAccountScreen />} />
          <Route
            path="/profile"
            element={
              currentUser ? (
                <Profile currentUser={currentUser} handleLogout={handleLogout} />
              ) : (
                <LoginScreen setUser={setUser} />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
