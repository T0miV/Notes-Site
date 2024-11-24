import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Profile.css'; // Assuming you will add the styles in Profile.css

interface ProfileProps {
  currentUser: { username: string; role: number } | null;
  handleLogout: () => void;
}

const Profile: FC<ProfileProps> = ({ currentUser, handleLogout }) => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const logout = () => {
    handleLogout();
    navigate("/login");
  };

  return (
    <div className="profile-container">
      <div className="profile-form">
        {currentUser ? (
          <>
            <h1 className="profile-title">Welcome, {currentUser.username}!</h1>
            <p className="profile-role">Role: {currentUser.role === 1 ? "Admin" : "User"}</p>
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
