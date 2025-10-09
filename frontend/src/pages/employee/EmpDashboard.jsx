import { useNavigate } from "react-router-dom";
import AppSidebar from "../../components/AppSidebar";
import { FolderOpen, ShieldCheck } from "lucide-react";

export default function EmpDashboard() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#1a1a1a",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <AppSidebar userType="employee" />
      <div style={{ flex: 1, padding: "3rem 2rem", color: "#fff" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
          Employee Dashboard
        </h1>
        <p style={{ color: "#bbb", marginBottom: "2rem" }}>
          Welcome! Here you can view and verify all transactions in the system.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.5rem",
          }}
        >
          <div
            style={{
              background: "#2a2a2a",
              padding: "1.5rem",
              borderRadius: "1rem",
              cursor: "pointer",
              boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onClick={() => navigate("/viewTransactions")}
          >
            <FolderOpen size={32} color="#60a5fa" />
            <h3 style={{ marginTop: "1rem", fontSize: "1.2rem" }}>
              View All Transactions
            </h3>
            <p style={{ color: "#bbb", marginTop: "0.5rem" }}>
              Check all processed transactions in the system.
            </p>
          </div>

          <div
            style={{
              background: "#2a2a2a",
              padding: "1.5rem",
              borderRadius: "1rem",
              cursor: "pointer",
              boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onClick={() => navigate("/verifyTransaction")}
          >
            <ShieldCheck size={32} color="#34d399" />
            <h3 style={{ marginTop: "1rem", fontSize: "1.2rem" }}>
              Verify Transaction
            </h3>
            <p style={{ color: "#bbb", marginTop: "0.5rem" }}>
              Ensure transactions are authentic with SWIFT codes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
