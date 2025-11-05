// src/components/employee/EmployeeDashboard.jsx
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import { ShieldCheck, History, DollarSign } from "lucide-react";

export default function EmployeeDashboard() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1a1a1a, #2a2a2a)",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <Sidebar />
      <div style={{ flex: 1, padding: "3rem 2rem", color: "#fff" }}>
        <div style={cardStyle}>
          <h1 style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>
            Welcome back!
          </h1>
          <p style={{ color: "#bbb", fontSize: "1rem" }}>
            Manage pending payments and review payment history.
          </p>
        </div>

        <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>
          Quick Actions
        </h2>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <button
            style={dashboardTile}
            onClick={() => navigate("/employee/pending-payments")}
          >
            <ShieldCheck size={22} style={{ marginRight: "0.5rem" }} />
            Pending Payments
          </button>
          <button
            style={dashboardTile}
            onClick={() => navigate("/employee/payment-history")}
          >
            <History size={22} style={{ marginRight: "0.5rem" }} />
            Payment History
          </button>
          <button style={dashboardTile}>
            <DollarSign size={22} style={{ marginRight: "0.5rem" }} />
            Statistics
          </button>
        </div>

        <h2 style={{ marginTop: "2.5rem", marginBottom: "1rem" }}>
          Recent Activity
        </h2>
        <div style={cardStyle}>
          <p style={{ color: "#bbb" }}>
            No pending payments requiring attention.
          </p>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  padding: "1.5rem",
  background: "#2a2a2a",
  borderRadius: "0.5rem",
};

const dashboardTile = {
  display: "flex",
  alignItems: "center",
  padding: "1rem 1.5rem",
  background: "#3a3a3a",
  border: "none",
  borderRadius: "0.5rem",
  color: "#fff",
  cursor: "pointer",
  fontSize: "1rem",
};
