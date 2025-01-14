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
import Dashboard from "./Pages/DashBoard";
import AllNotesPage from "./Pages/AllNotesPage";
import CalendarPage from "./Pages/CalendarPage";
import DeletedNotesPage from "./Pages/DeletedNotesPage";
import axios from "axios"; // Axios for API requests

const App: FC = () => {
  const [currentUser, setCurrentUser] = useState<{ username: string; role: number } | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null); // Auth token for API requests

  // Load user and token from localStorage on app load
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    const storedToken = localStorage.getItem("authToken");

    if (storedUser && storedToken) {
      setCurrentUser(JSON.parse(storedUser));
      setAuthToken(storedToken);

      // Set the default Authorization header for Axios
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }
  }, []);

  // Save user and token to localStorage when it changes
  useEffect(() => {
    if (currentUser && authToken) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      localStorage.setItem("authToken", authToken);
    } else {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("authToken");
    }
  }, [currentUser, authToken]);

  const setUser = (username: string, role: number, token: string) => {
    setCurrentUser({ username, role });
    setAuthToken(token);

    // Set the Authorization header for Axios
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setAuthToken(null);

    // Remove the Authorization header
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <div>
      <BrowserRouter>
        <Header currentUser={currentUser} handleLogout={handleLogout} />
        <Navigointi />

        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/login" element={<LoginScreen setUser={setUser} />} />
          <Route path="/information" element={<InformationScreen />} />
          <Route path="/createprofile" element={<CreateAccountScreen />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/all-notes" element={<AllNotesPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/trash" element={<DeletedNotesPage />} />
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
