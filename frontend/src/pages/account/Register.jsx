import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Register.css";
import { register } from "../../services/apiService";

const Register = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  const [customerData, setCustomerData] = useState({
    userType: "customer",
    firstName: "",
    lastName: "",
    nationalId: "",
    accountNumber: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const requestBody = { ...customerData, userType: "customer" };
      const response = await register(requestBody);

      setMessage(response.data.message);
      setMessageType("success");

      // Redirect after successful registration
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      const serverMessage = error.response?.data?.message || error.message;
      setMessage(`Server error: ${serverMessage}`);
      setMessageType("error");
    }
  };

  const handleChange = (e) => {
    setCustomerData({ ...customerData, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="register-flex-wrapper"
      style={{ minHeight: "100vh", overflow: "hidden" }}
    >
      <div className="register-form-container">
        <h1>Register</h1>
        <form className="register-form" onSubmit={handleRegister}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={customerData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={customerData.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="nationalId"
            placeholder="ID Number"
            value={customerData.nationalId}
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
            type="text"
            name="username"
            placeholder="Username"
            value={customerData.username}
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
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit">Register</button>
          <p style={{ color: "#e6f0ff", textAlign: "center" }}>
            Already have an account?{" "}
            <a
              href="/login"
              style={{ color: "#3b82f6", textDecoration: "none" }}
            >
              Login
            </a>
          </p>
        </form>
      </div>

      <div className="register-image-container">
        <img src="/phone.jpg" alt="Coinnect Logo" />
      </div>
    </div>
  );
};

export default Register;
