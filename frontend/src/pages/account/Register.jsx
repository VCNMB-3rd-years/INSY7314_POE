import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Temporary users for testing
  const mockUsers = [
    { username: "customer1", password: "1234", type: "customer" },
    { username: "employee1", password: "1234", type: "employee" },
  ];

  const handleRegister = (e) => {
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
    if (user.type === "customer") navigate("/custDashboard");
    else if (user.type === "employee") navigate("/empDashboard");
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
          {error && <p>{error}</p>}
          <button type="submit">Register</button>
        </form>
      </div>
      <div className="register-image-container">
        <img src="/phone.jpg" alt="Coinnect Logo" />
      </div>
    </div>
  );
};

export default Register;
