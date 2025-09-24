import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BankNavbar from "../../components/BankNavbar";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Temporary users for testing
  const mockUsers = [
    { username: "customer1", password: "1234", type: "customer" },
    { username: "employee1", password: "1234", type: "employee" },
  ];

  const handleLogin = (e) => {
    e.preventDefault();

    // Replace this with real backend call later
    const user = mockUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      setError("Invalid username or password");
      return;
    }

    // Redirect based on user type
    if (user.type === "customer") navigate("/customer/dashboard");
    else if (user.type === "employee") navigate("/employee/dashboard");
  };

  return (
    <>
      <BankNavbar userType="guest" />
      <div className="page-container" style={{ padding: "2rem" }}>
        <h1>Login</h1>
        <form
          onSubmit={handleLogin}
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "300px",
            gap: "1rem",
          }}
        >
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
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
