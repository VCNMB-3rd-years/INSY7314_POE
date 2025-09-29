import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Paper } from "@mui/material";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import BankNavbar from "../../components/BankNavbar";
import "../../App.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Username and password are required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/login", {
        username,
        password,
      });

      const customer = response.data.customer;
      if (!customer) {
        setError("Login failed");
        return;
      }

      localStorage.setItem("customer", JSON.stringify(customer));
      navigate("/customer/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Server not reachable");
    }
  };

  return (
    <>
      <BankNavbar userType="guest" />
      <div className="auth-container">
         <Paper elevation={20} className="auth-card">
          <h2 className="auth-title">Login</h2>
          <form onSubmit={handleLogin} className="auth-form">
            <div className="input-group">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
            {error && <p className="error-text">{error}</p>}
            <button type="submit" className="auth-button">
              Login
            </button>
            
          </form>
          </Paper>
        </div>
      
    </>
  );
};

export default Login;
