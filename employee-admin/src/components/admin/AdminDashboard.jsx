// src/components/admin/AdminDashboard.jsx
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import { Users, UserPlus } from "lucide-react";

export default function AdminDashboard() {
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
            Manage employee accounts and system access.
          </p>
        </div>

        <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>
          Quick Actions
        </h2>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <button
            style={dashboardTile}
            onClick={() => navigate("/admin/employees")}
          >
            <Users size={22} style={{ marginRight: "0.5rem" }} />
            Employee Accounts
          </button>
          <button
            style={dashboardTile}
            onClick={() => navigate("/admin/create-employee")}
          >
            <UserPlus size={22} style={{ marginRight: "0.5rem" }} />
            Create Employee
          </button>
        </div>

        <h2 style={{ marginTop: "2.5rem", marginBottom: "1rem" }}>
          System Overview
        </h2>
        <div style={cardStyle}>
          <p style={{ color: "#bbb" }}>
            System is running normally. All services operational.
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
