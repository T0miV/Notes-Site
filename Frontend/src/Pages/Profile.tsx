import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/Profile.css'; // Import the CSS file for styles

interface ProfileProps {
  currentUser: { username: string; role: number } | null;
  handleLogout: () => void;
}

const Profile = ({ currentUser, handleLogout }: ProfileProps) => {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const logout = () => {
    handleLogout();
    navigate("/login");
  };

  // Password change handler
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null); // Reset messages
    setError(null); // Reset errors
  
    if (!oldPassword || !newPassword) {
      setError("Both old and new passwords are required.");
      return;
    }
  
    const token = localStorage.getItem("authToken"); // Retrieve token from local storage
    if (!token) {
      setError("You need to be logged in to change the password.");
      return;
    }
  
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/update-password`,
        { oldPassword, newPassword },
        { 
          headers: { 
            'Authorization': `Bearer ${token}`  // Send token in header
          } 
        }
      );
      
      setMessage(response.data.message); // Display success message
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError("Your session has expired. Please login again."); // Handle expired session
      } else {
        setError(err.response?.data?.error || "Failed to update password"); // Handle other errors
      }
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-form">
        {currentUser ? (
          <>
            <h1 className="profile-title">Welcome, {currentUser.username}!</h1>
            <p className="profile-role">Role: {currentUser.role === 1 ? "Admin" : "User"}</p>

            {/* Password change form */}
            <form onSubmit={handlePasswordChange}>
              <div className="input-group">
                <label htmlFor="oldPassword">Old Password</label>
                <input
                  type="password"
                  id="oldPassword"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="submit-button">Change Password</button>
            </form>

            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}

            <button onClick={logout} className="plogout-button">
              Logout
            </button>
          </>
        ) : (
          <>
            <h1 className="profile-title">You are not logged in.</h1>
            <button onClick={handleLoginRedirect} className="login-button">
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
