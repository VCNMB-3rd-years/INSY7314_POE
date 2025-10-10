import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppSidebar from "../../components/AppSidebar";
import { createTransaction } from "../../services/apiService";

export default function CreateTransaction() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  const [transactionData, setTransactionData] = useState({
    status: "",
    recipientReference: "",
    customerReference: "",
    amount: "",
    customerBankId: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTransaction(transactionData);
      setMessage("Transaction created successfully!");
      setMessageType("success");

      // reset form
      setTransactionData({
        status: "",
        recipientReference: "",
        customerReference: "",
        amount: "",
        customerBankId: "",
      });
    } catch (err) {
      setMessage("Failed to create transaction.");
      setMessageType("error");
    }
  };

  const backToDash = () => {
    navigate("/custDashboard");
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
          <h1 style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>
            Create Transaction
          </h1>

          {/* ✅ Success / Error Message */}
          {message && (
            <div
              style={{
                background:
                  messageType === "success" ? "#2e7d32" : "#c62828",
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
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.2rem",
            }}
          >
            <input
              type="number"
              placeholder="Amount"
              required
              style={inputStyle}
              value={transactionData.amount}
              onChange={(e) =>
                setTransactionData({ ...transactionData, amount: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Customer Reference"
              style={inputStyle}
              value={transactionData.customerReference}
              onChange={(e) =>
                setTransactionData({ ...transactionData, customerReference: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Recipient Reference"
              required
              style={inputStyle}
              value={transactionData.recipientReference}
              onChange={(e) =>
                setTransactionData({ ...transactionData, recipientReference: e.target.value })
              }
            />

            <button type="submit" style={buttonPrimaryStyle}>
              Send Transaction
            </button>
          </form>

          <button
            style={{
              ...buttonSecondaryStyle,
              marginTop: "1.5rem",
            }}
            onClick={backToDash}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "0.9rem 1rem",
  borderRadius: "0.6rem",
  border: "1px solid #444",
  background: "#1e1e1e",
  color: "#fff",
  fontSize: "0.95rem",
  outline: "none",
  transition: "border 0.2s, box-shadow 0.2s",
};

const buttonPrimaryStyle = {
  padding: "0.9rem 1rem",
  borderRadius: "0.6rem",
  border: "none",
  background: "linear-gradient(135deg, #4a90e2, #357ab8)",
  color: "#fff",
  fontSize: "1rem",
  fontWeight: "600",
  cursor: "pointer",
  transition: "background 0.3s, transform 0.2s",
};

const buttonSecondaryStyle = {
  padding: "0.9rem 1rem",
  borderRadius: "0.6rem",
  border: "1px solid #666",
  background: "transparent",
  color: "#bbb",
  fontSize: "1rem",
  fontWeight: "500",
  cursor: "pointer",
  transition: "background 0.3s, transform 0.2s",
};
