import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import axios from "axios";
import { FaSpinner } from "react-icons/fa"; // Varmista, että react-icons on asennettu

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

import "../src/styles/App.css"; // Lisää tämä rivi, jos käytät CSS-tiedostoa animaatioiden hallintaan

type User = { username: string; role: number } | null;

interface AnimatedRoutesProps {
  currentUser: User;
  handleLogout: () => void;
  setUser: (username: string, role: number, token: string) => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>; // Set loading for parent component
}

const App = () => {
  const [currentUser, setCurrentUser] = useState<User>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Lisää tila latauksen tilalle

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    const storedToken = localStorage.getItem("authToken");

    if (storedUser && storedToken) {
      setCurrentUser(JSON.parse(storedUser));
      setAuthToken(storedToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }
  }, []);

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
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setAuthToken(null);
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <div>
      <BrowserRouter>
        <Header currentUser={currentUser} handleLogout={handleLogout} />
        <Navigointi />
        
        {/* Näytetään latauskuvake, jos "loading" tila on true */}
        {loading && (
          <div className="loader-overlay">
            <FaSpinner className="loader-icon" />
          </div>
        )}
        
        <AnimatedRoutes 
          currentUser={currentUser} 
          handleLogout={handleLogout} 
          setUser={setUser} 
          setLoading={setLoading} // Lisää setLoading props
        />
      </BrowserRouter>
    </div>
  );
};

const AnimatedRoutes = ({ currentUser, handleLogout, setUser, setLoading }: AnimatedRoutesProps) => {
  const location = useLocation();

  useEffect(() => {
    setLoading(true); // Asetetaan loading tilaksi true ennen siirtymistä
    const timer = setTimeout(() => {
      setLoading(false); // Poistetaan loading tilasta 3 sekunnin kuluttua
    }, 450); // Animaatio pyörii 3 sekuntia

    return () => clearTimeout(timer);
  }, [location, setLoading]);

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={300}>
        <Routes location={location}>
          <Route path="/" element={<FrontPage />} />
          <Route path="/login" element={<LoginScreen setUser={setUser} />} />
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
                <LoginScreen setUser={setUser} />
              )
            }
          />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default App;
