import React, { useState, FC } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/Profile.css';

interface ProfileProps {
  currentUser: { username: string; role: number } | null;
  handleLogout: () => void;
}

const Profile: FC<ProfileProps> = ({ currentUser, handleLogout }) => {
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

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!oldPassword || !newPassword) {
      setError("Both old and new passwords are required.");
      return;
    }

    try {
      const response = await axios.put(
        "/api/user/update-password",
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setMessage(response.data.message);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to update password");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-form">
        {currentUser ? (
          <>
            <h1 className="profile-title">Welcome, {currentUser.username}!</h1>
            <p className="profile-role">Role: {currentUser.role === 1 ? "Admin" : "User"}</p>

            {/* Password Change Form */}
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

            <button onClick={logout} className="logout-button">
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
