import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { FaSpinner } from "react-icons/fa";

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

import "../src/styles/App.css";
import { AuthProvider, useAuth } from "../src/context/AuthContext"; // Import AuthProvider and useAuth

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
  const location = useLocation();

  return (
    <div>
      <Header currentUser={currentUser} handleLogout={handleLogout} />
      <Navigointi />

      {/* Display a loading spinner animation if the loading state is true */}
      {loading && (
        <div className="loader-overlay">
          <FaSpinner className="loader-icon" />
        </div>
      )}

      {/* Render the AnimatedRoutes component */}
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="fade" timeout={300}>
          <Routes location={location}>
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
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default App;