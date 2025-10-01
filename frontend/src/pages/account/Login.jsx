import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Temporary users for testing
  const mockUsers = [
    {
      username: "customer1",
      accountNumber: "10001",
      password: "1234",
      type: "customer",
    },
    {
      username: "employee1",
      accountNumber: "20001",
      password: "1234",
      type: "employee",
    },
  ];

  const handleLogin = (e) => {
    e.preventDefault();

    // Replace this with real backend call later
    const user = mockUsers.find(
      (u) =>
        u.username === username &&
        u.accountNumber === accountNumber &&
        u.password === password
    );

    if (!user) {
      setError("Invalid username, account number, or password");
      return;
    }

    // Redirect based on user type
    if (user.type === "customer") navigate("/custDashboard");
    else if (user.type === "employee") navigate("/empDashboard");
  };

  return (
    <div
      className="login-flex-wrapper"
      style={{ minHeight: "100vh", overflow: "hidden" }}
    >
      <div className="login-form-container">
        <h1>Login</h1>
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Account Number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
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
};

export default Login;
