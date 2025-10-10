import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  // local state
  const [userType, setUserType] = useState("customer");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // attempt login
      const response = await login(userType, username, password);

      
      if (userType === "customer") navigate("/custDashboard");
      else if (userType === "employee") navigate("/empDashboard");
      else navigate("/");

      console.log("Login successful:", response);
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err?.response?.data?.message ||
          "Server connection failed. Please try again later."
      );
    }
  };

  return (
    <div
      className="login-flex-wrapper"
      style={{ minHeight: "100vh", overflow: "hidden" }}
    >
      <div className="login-form-container">
        <h1>Login</h1>
        <form className="login-form" onSubmit={handleLogin}>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            required
          >
            <option value="customer">Customer</option>
            <option value="employee">Employee</option>
          </select>
<br />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p style={{ color: "#e74c3c" }}>{error}</p>}

          <button type="submit">Login</button>
        </form>
      </div>

      <div className="login-image-container">
        <img src="/phone.jpg" alt="Coinnect Logo" />
      </div>
    </div>
  );
}
