import React from "react";
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

import "../src/styles/App.css"; // Varmista, että CSS-tiedosto on tuotu
import { AuthProvider, useAuth } from "../src/context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
};

const AppContent = () => {
  const { currentUser, handleLogout, loading } = useAuth();

  return (
    <div>
      <Header currentUser={currentUser} handleLogout={handleLogout} />
      <Navigointi />

      {/* Näytä latausanimaatio, jos lataus on käynnissä */}
      {loading && (
        <div className="loader-overlay">
          <div className="loader-circle"></div> {/* Pyörivä ympyrä */}
        </div>
      )}

      {/* Reitit ilman animaatiota */}
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/information" element={<InformationScreen />} />
        <Route path="/createprofile" element={<CreateAccountScreen />} />
        <Route
          path="/dashboard"
          element={<Dashboard currentUser={currentUser} handleLogout={handleLogout} />}
        />
        <Route path="/all-notes" element={<AllNotesPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/trash" element={<DeletedNotesPage />} />
        <Route
          path="/profile"
          element={
            currentUser ? (
              <Profile currentUser={currentUser} handleLogout={handleLogout} />
            ) : (
              <LoginScreen />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;