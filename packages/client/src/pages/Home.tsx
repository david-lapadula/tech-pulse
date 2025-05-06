import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Welcome to the Homepage</h1>
      <button onClick={() => navigate("/login")}>Login</button>
    </div>
  );
};

export default Home;
