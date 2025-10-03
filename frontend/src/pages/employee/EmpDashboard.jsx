import { useNavigate } from "react-router-dom";
import AppSidebar from "../../components/AppSidebar";

export default function EmpDashboard() {
  const navigate = useNavigate();

  const viewTransactions = () => {
    navigate("/viewTransactions");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#242424" }}>
      <AppSidebar userType="employee" />
      <div style={{ flex: 1, padding: "3rem 2rem", color: "#fff" }}>
        <h1>Employee Dashboard</h1>
        <p>
          Welcome to your dashboard! Here you can create, view, and verify
          transactions.
        </p>
        <button onClick={viewTransactions}>View All Transactions</button>
      </div>
    </div>
  );
}
