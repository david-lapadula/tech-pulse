import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import { AuthProvider } from "./auth/AuthContext";
import ChatWindow from "./components/ChatWindow/ChatWindow";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={ <Dashboard /> } />
          <Route path="/login" element={<Login />} />
        </Routes>
        <ChatWindow />
      </Router>
    </AuthProvider>
  );
};

export default App;
