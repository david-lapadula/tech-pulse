import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import "./Login.css";

const Login: React.FC = () => {
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    try {
      if (isLogin) {
        if (login(username, password)) {
          navigate("/dashboard");
        } else {
          setError("Invalid credentials");
        }
      } else {
        if (signup(username, password)) {
          navigate("/dashboard");
        } else {
          setError("Username already exists");
        }
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  const handleGoogleAuth = async () => {
    // Implement Google authentication here
    console.log("Google auth clicked");
  };

  return (
    <div className="login-container">
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="auth-buttons">
          <button type="submit" className="auth-button">
            {isLogin ? "Login" : "Sign Up"}
          </button>
          
          <button
            type="button"
            className="auth-button google-auth-button"
            onClick={handleGoogleAuth}
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
            />
            Continue with Google
          </button>
        </div>
      </form>

      <div className="auth-toggle">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button
          type="button"
          onClick={() => {
            setIsLogin(!isLogin);
            setError("");
          }}
        >
          {isLogin ? "Sign Up" : "Login"}
        </button>
      </div>
      <div className="back-to-dashboard">
        <button
          type="button"
          className="auth-button"
          onClick={() => navigate("/")}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Login;
