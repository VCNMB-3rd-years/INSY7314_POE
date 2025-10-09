import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [username, setUsername] = useState("");
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

  const handleRegister = async (e) => {
  e.preventDefault();
  setError(""); // clear previous errors

  try {
    // Prepare the data to send to the backend
    const requestBody = {
      userType: "customer",  // or "employee" based on your form
      username,
      password,
      nationalId,
      firstName,
      lastName
    };

    // Call your backend register endpoint
    const response = await fetch("http://localhost:3000/v1/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || "Registration failed");
      return;
    }

    // Successful registration: redirect based on type
    if (requestBody.userType === "customer") navigate("/custDashboard");
    else if (requestBody.userType === "employee") navigate("/empDashboard");
  } catch (err) {
    setError("Server error: " + err.message);
  }
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
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="ID Number"
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Account Number"
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
