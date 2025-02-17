import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import axios from "axios";
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

// Define the structure of a User object
type User = { username: string; role: number } | null;

//Define the props for the AnimatedRoutes component
interface AnimatedRoutesProps {
  currentUser: User;
  handleLogout: () => void;
  setUser: (username: string, role: number, token: string) => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>; // Set loading for parent component
}

const App = () => {
  //State to store the current user
  const [currentUser, setCurrentUser] = useState<User>(null);
  //State to store the authentication token
  const [authToken, setAuthToken] = useState<string | null>(null);
  //State to manage loading status
  const [loading, setLoading] = useState<boolean>(false);

  //Load user and token from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    const storedToken = localStorage.getItem("authToken");

    if (storedUser && storedToken) {
      setCurrentUser(JSON.parse(storedUser));
      setAuthToken(storedToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }
  }, []);

  //Save user and token to localStorage when they change
  useEffect(() => {
    if (currentUser && authToken) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      localStorage.setItem("authToken", authToken);
    } else {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("authToken");
    }
  }, [currentUser, authToken]);

  //Function to set the current user and authentication token
  const setUser = (username: string, role: number, token: string) => {
    setCurrentUser({ username, role });
    setAuthToken(token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  //Function to handle user logout and reset the current user and authentication token
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
        
        {/* Display a loading spinner animation if the loading state is true */}
        {loading && (
          <div className="loader-overlay">
            <FaSpinner className="loader-icon" />
          </div>
        )}
        
        {/* Render the AnimatedRoutes component */}
        <AnimatedRoutes 
          currentUser={currentUser} 
          handleLogout={handleLogout} 
          setUser={setUser} 
          setLoading={setLoading} //
        />
      </BrowserRouter>
    </div>
  );
};

//Component to handle animated route transitions
const AnimatedRoutes = ({ currentUser, handleLogout, setUser, setLoading }: AnimatedRoutesProps) => {
  const location = useLocation();

  // Set loading state to true before route transition and false after a delay
  useEffect(() => {
    setLoading(true); // Set loading state to true before transition
    const timer = setTimeout(() => {
      setLoading(false); // Set loading state to false after 450ms
    }, 450); // Spinner will be visible for 450ms

    return () => clearTimeout(timer);
  }, [location, setLoading]);

  return (
    <TransitionGroup>
      {/* Add CSS transition for route changes */}
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