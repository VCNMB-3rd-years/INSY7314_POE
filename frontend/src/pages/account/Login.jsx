import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.css";
import { login } from "../../services/apiService";

const Login = () => {
  const navigate = useNavigate();
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
  setError("");

  try {
    const requestBody = {
      ...customerData,
      userType: "customer", // or "employee"
      accountNumber: Number(customerData.accountNumber)
    };

    const response = await login(requestBody);

    // Successful login
    console.log(response.data);
    navigate("/custDashboard");
  } catch (err) {
    if (err.response) {
      setError(err.response.data.message || "Invalid credentials");
    } else {
      setError("Server error: " + err.message);
    }
  }
};


  return (
    <div className="login-flex-wrapper" style={{ minHeight: "100vh", overflow: "hidden" }}>
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
};

export default Login;
