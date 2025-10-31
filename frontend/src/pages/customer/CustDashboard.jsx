import { useNavigate } from "react-router-dom";
import AppSidebar from "../../components/AppSidebar";
import { FaMoneyCheckAlt, FaHistory } from "react-icons/fa";

export default function CustDashboard() {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "linear-gradient(135deg, #1a1a1a, #2a2a2a)", fontFamily: "Inter, sans-serif" }}>
      <AppSidebar />
      <div style={{ flex: 1, padding: "3rem 2rem", color: "#fff" }}>
        <div style={cardStyle}>
          <h1 style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>Welcome back!</h1>
          <p style={{ color: "#bbb", fontSize: "1rem" }}>
            Here you can create new transactions and view your transaction history.
          </p>
        </div>

        <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>Quick Actions</h2>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <button style={dashboardTile} onClick={() => navigate("/createTransaction")}>
            <FaMoneyCheckAlt size={22} style={{ marginRight: "0.5rem" }} />
            New Transaction
          </button>
          <button style={dashboardTile} onClick={() => navigate("/custTransactions")}>
            <FaHistory size={22} style={{ marginRight: "0.5rem" }} />
            View History
          </button>
        </div>

        <h2 style={{ marginTop: "2.5rem", marginBottom: "1rem" }}>Recent Activity</h2>
        <div style={cardStyle}>
          <p style={{ color: "#bbb" }}>No recent transactions yet.</p>
        </div>
      </div>
    </div>
  );
}

// Example inline styles
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
