import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Temporary users for testing
  const mockUsers = [
    {
      fullName: "John Doe",
      idNumber: "1234567890",
      accountNumber: "10001",
      password: "1234",
      type: "customer",
    },
    {
      fullName: "Jane Smith",
      idNumber: "9876543210",
      accountNumber: "20001",
      password: "1234",
      type: "employee",
    },
  ];

  const handleRegister = (e) => {
    e.preventDefault();

    // Replace this with real backend call later
    const user = mockUsers.find(
      (u) =>
        u.fullName === fullName &&
        u.idNumber === idNumber &&
        u.accountNumber === accountNumber &&
        u.password === password
    );

    if (!user) {
      setError("Invalid registration details");
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
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="ID Number"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
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
