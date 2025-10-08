import { useNavigate } from "react-router-dom";
import AppSidebar from "../../components/AppSidebar";
import { FaMoneyCheckAlt, FaHistory } from "react-icons/fa";

export default function CustDashboard() {
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
      <AppSidebar userType="customer" />
      <div
        style={{
          flex: 1,
          padding: "3rem 2rem",
          color: "#fff",
        }}
      >
        {/* Welcome Card */}
        <div style={cardStyle}>
          <h1 style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>
            Welcome back!
          </h1>
          <p style={{ color: "#bbb", fontSize: "1rem" }}>
            Here you can create new transactions and view your transaction
            history.
          </p>
        </div>

        {/* Quick Actions */}
        <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>
          Quick Actions
        </h2>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <button
            style={dashboardTile}
            onClick={() => navigate("/createTransaction")}
          >
            <FaMoneyCheckAlt size={22} style={{ marginRight: "0.5rem" }} />
            New Transaction
          </button>

          <button
            style={dashboardTile}
            onClick={() => navigate("/custTransactions")}
          >
            <FaHistory size={22} style={{ marginRight: "0.5rem" }} />
            View History
          </button>
        </div>

        {/* Recent Activity */}
        <h2 style={{ marginTop: "2.5rem", marginBottom: "1rem" }}>
          Recent Activity
        </h2>
        <div style={cardStyle}>
          <p style={{ color: "#bbb" }}>No recent transactions yet.</p>
          {/* Later you can map transactions here */}
        </div>
      </div>
    </div>
  );
}

// 🔹 Shared styles
const cardStyle = {
  background: "#2a2a2a",
  padding: "1.5rem",
  borderRadius: "1rem",
  boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
};

const dashboardTile = {
  flex: 1,
  minWidth: "200px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
  background: "#333",
  padding: "1.5rem",
  borderRadius: "0.8rem",
  color: "#fff",
  fontSize: "1.05rem",
  fontWeight: "600",
  cursor: "pointer",
  border: "1px solid #444",
  transition: "transform 0.2s, background 0.3s",
};
