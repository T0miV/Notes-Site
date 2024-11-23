import React, { FC } from "react";
import { useNavigate } from "react-router-dom";

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
    <div style={{ padding: "20px" }}>
      {currentUser ? (
        <>
          <h1>Welcome, {currentUser.username}!</h1>
          <p>Role: {currentUser.role === 1 ? "Admin" : "User"}</p>
          <button onClick={logout} style={{ marginTop: "20px", padding: "10px 20px" }}>
            Logout
          </button>
        </>
      ) : (
        <>
          <h1>You are not logged in.</h1>
          <button onClick={handleLoginRedirect} style={{ marginTop: "20px", padding: "10px 20px" }}>
            Login
          </button>
        </>
      )}
    </div>
  );
};

export default Profile;
