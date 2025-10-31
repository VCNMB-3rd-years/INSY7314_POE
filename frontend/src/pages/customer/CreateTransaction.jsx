import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppSidebar from "../../components/AppSidebar";
import { createTransaction as apiCreateTransaction } from "../../services/apiService";
import { useAuth } from "../../context/AuthContext.jsx";

export default function CreateTransaction() {
  const navigate = useNavigate();
  const { token, user } = useAuth(); // Get token and user info
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  const [transactionData, setTransactionData] = useState({
    recipientReference: "",
    customerReference: "",
    amount: "",
    swiftCode: "",
    status: "",
  });

  const handleChange = (e) => {
    setTransactionData({ ...transactionData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token || !user) {
      setMessage("You must be logged in to create a transaction.");
      setMessageType("error");
      return;
    }

    // Prepare payload for backend
    const payload = {
      status: false,
      recipientReference: transactionData.recipientReference,
      customerReference: transactionData.customerReference,
      amount: Number(transactionData.amount),
      customerId: user.customerId,
      swiftCode: transactionData.swiftCode, 
    };

    try {
      await apiCreateTransaction(payload, token); // pass token to API
      setMessage("Transaction created successfully!");
      setMessageType("success");
      navigate("/custTransactions");
      // Reset form
      setTransactionData({
        recipientReference: "",
        customerReference: "",
        amount: "",
        swiftCode: "",
      });
    } catch (err) {
      console.error("Transaction creation error:", err.response?.data || err.message);
      setMessage(err.response?.data?.message || "Failed to create transaction.");
      setMessageType("error");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#1a1a1a",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <AppSidebar userType="customer" />
      <div
        style={{
          flex: 1,
          padding: "3rem 2rem",
          color: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            background: "#2a2a2a",
            padding: "2rem",
            borderRadius: "1rem",
            boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
            width: "100%",
            maxWidth: "420px",
          }}
        >
          <h1 style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>Create Transaction</h1>

          {message && (
            <div
              style={{
                background: messageType === "success" ? "#2e7d32" : "#c62828",
                color: "white",
                padding: "0.75rem",
                borderRadius: "0.5rem",
                marginBottom: "1rem",
                textAlign: "center",
              }}
            >
              {message}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
          >
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              required
              style={inputStyle}
              value={transactionData.amount}
              onChange={handleChange}
            />

            <input
              type="text"
              name="customerReference"
              placeholder="Customer Reference"
              required
              style={inputStyle}
              value={transactionData.customerReference}
              onChange={handleChange}
            />

            <input
              type="text"
              name="recipientReference"
              placeholder="Recipient Reference"
              required
              style={inputStyle}
              value={transactionData.recipientReference}
              onChange={handleChange}
            />

            <input
              type="text"
              name="swiftCode"
              placeholder="Swift Code"
              required
              style={inputStyle}
              value={transactionData.swiftCode}
              onChange={handleChange}
            />

            <button type="submit" style={buttonPrimaryStyle}>
              Send Transaction
            </button>
          </form>

          <button
            style={{ ...buttonSecondaryStyle, marginTop: "1.5rem" }}
            onClick={() => navigate("/custDashboard")}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

// Shared input/button styles
const inputStyle = {
  padding: "0.75rem 1rem",
  borderRadius: "0.6rem",
  border: "1px solid #555",
  background: "#1a1a1a",
  color: "#fff",
  fontSize: "1rem",
};

const buttonPrimaryStyle = {
  padding: "0.85rem",
  borderRadius: "0.6rem",
  border: "none",
  background: "#007bff",
  color: "#fff",
  fontWeight: "600",
  cursor: "pointer",
};

const buttonSecondaryStyle = {
  padding: "0.75rem",
  borderRadius: "0.6rem",
  border: "1px solid #555",
  background: "transparent",
  color: "#fff",
  cursor: "pointer",
};
