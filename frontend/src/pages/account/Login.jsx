import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { login as apiLogin } from "../../services/apiService";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [customerData, setCustomerData] = useState({
    userType: "customer",
    username: "",
    accountNumber: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCustomerData({ ...customerData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await apiLogin(customerData);
      login(res.data.token); // Pass JWT token to AuthContext
      navigate("/custDashboard");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      console.error(err);
    }
  };

  return (
    <div className="login-flex-wrapper" style={{ minHeight: "100vh" }}>
      <div className="login-form-container">
        <h1>Login</h1>
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={customerData.username}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="accountNumber"
            placeholder="Account Number"
            value={customerData.accountNumber}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={customerData.password}
            onChange={handleChange}
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
